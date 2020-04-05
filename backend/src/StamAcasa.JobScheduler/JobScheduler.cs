using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cronos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StamAcasa.JobScheduler.Extensions;
using StamAcasa.JobScheduler.Jobs;
using Timer = System.Timers.Timer;

namespace StamAcasa.JobScheduler
{
    internal class JobScheduler : BackgroundService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<JobScheduler> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        private readonly ConcurrentDictionary<Type, Timer> _schedule = new ConcurrentDictionary<Type, Timer>();

        public JobScheduler(
            IConfiguration configuration,
            ILogger<JobScheduler> logger,
            IServiceScopeFactory serviceScopeFactory)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _serviceScopeFactory = serviceScopeFactory ?? throw new ArgumentNullException(nameof(serviceScopeFactory));
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            try
            {
                ScheduleConfiguredJobs(cancellationToken);
            }
            catch (Exception exception)
            {
                _logger.LogCritical(exception, $"Error when scheduling jobs: {exception.Message.TrimEnd('.')}.");
                _logger.LogInformation("Stopping job scheduler service.");

                await StopAsync(cancellationToken);
                return;
            }

            while (!cancellationToken.IsCancellationRequested)
            {
                _logger.LogInformation($"Job Scheduler running at: {DateTimeOffset.Now}");
                await Task.Delay(30000, cancellationToken);
            }
        }

        private void ScheduleConfiguredJobs(CancellationToken cancellationToken)
        {
            var schedulerConfiguration = new Dictionary<string, string>();
            var section = _configuration.GetSection(ConfigurationSectionKey.ScheduledJobs);
            section.Bind(schedulerConfiguration);
            
            foreach (var jobTypeKey in schedulerConfiguration.Keys)
            {
                var jobType = Type.GetType(jobTypeKey);

                if (jobType is null || !typeof(IScheduledJob).IsAssignableFrom(jobType))
                {
                    throw new Exception(
                        $"Invalid job configuration: {jobTypeKey} does not implement the {typeof(IScheduledJob)} interface.");
                }

                var cronExpression = CronExpression.Parse(schedulerConfiguration[jobTypeKey]);
                var interval = cronExpression.GetTimeSpanToNextOccurrence();
                var timer = new Timer(interval.TotalMilliseconds) { Enabled = true };

                timer.Elapsed += async (sender, args) =>
                {
                    using IServiceScope scope = _serviceScopeFactory.CreateScope();
                    var job = (IScheduledJob)scope.ServiceProvider.GetService(jobType);

                    _logger.LogInformation($"Running job {jobType} at {DateTimeOffset.Now}");
                    await job.RunAsync(cancellationToken);

                    var newInterval = cronExpression.GetTimeSpanToNextOccurrence();
                    timer.Interval = newInterval.TotalMilliseconds;
                };

                _schedule[jobType] = timer;
            }
        }
    }
}
