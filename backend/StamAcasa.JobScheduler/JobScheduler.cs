using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cronos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Timer = System.Timers.Timer;

namespace StamAcasa.JobScheduler
{
    internal class JobScheduler : BackgroundService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<JobScheduler> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        private readonly Dictionary<Type, Timer> _schedule = new Dictionary<Type, Timer>();

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
            ScheduleJobs(cancellationToken);

            while (!cancellationToken.IsCancellationRequested)
            {
                _logger.LogInformation($"Job Scheduler running at: {DateTimeOffset.Now}");
                await Task.Delay(5000, cancellationToken);
            }
        }

        private void ScheduleJobs(CancellationToken cancellationToken)
        {
            var schedulerConfiguration = new Dictionary<string, string>();
            var section = _configuration.GetSection(ConfigurationSectionKey.ScheduledJobs);
            section.Bind(schedulerConfiguration);
            
            foreach (var jobTypeKey in schedulerConfiguration.Keys)
            {
                var jobType = Type.GetType(jobTypeKey);

                if (jobType is null || !typeof(IScheduledJob).IsAssignableFrom(jobType))
                {
                    throw new InvalidOperationException();
                }

                var cronExpression = CronExpression.Parse(schedulerConfiguration[jobTypeKey]);
                DateTimeOffset? next = cronExpression.GetNextOccurrence(DateTimeOffset.Now, TimeZoneInfo.Local);

                if (next is null)
                {
                    throw new InvalidOperationException();
                }

                var interval = next.Value - DateTimeOffset.Now;
                var timer = new Timer(interval.TotalMilliseconds);
                timer.Elapsed += async (sender, args) =>
                {
                    await ExecuteJob(jobType, cancellationToken, timer, cronExpression);
                };
                timer.Enabled = true;
                _schedule[jobType] = timer;
            }
        }

        private async Task ExecuteJob(Type jobType, CancellationToken cancellationToken, Timer timer, CronExpression cronExpression)
        {
            using IServiceScope scope = _serviceScopeFactory.CreateScope();
            var job = scope.ServiceProvider.GetService(jobType) as IScheduledJob;

            if (job is null)
            {
                throw new InvalidOperationException();
            }

            await job.ExecuteAsync(cancellationToken);

            DateTimeOffset? next = cronExpression.GetNextOccurrence(DateTimeOffset.Now, TimeZoneInfo.Local);
            if (next is null)
            {
                throw new InvalidOperationException();
            }
            var interval = next.Value - DateTimeOffset.Now;
            timer.Interval = interval.TotalMilliseconds;
        }
    }
}
