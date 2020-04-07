using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace StamAcasa.JobScheduler.Jobs
{
    internal class HealthCheckJob : IScheduledJob
    {
        private readonly ILogger<HealthCheckJob> _logger;

        public HealthCheckJob(ILogger<HealthCheckJob> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task RunAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Job {nameof(HealthCheckJob)} ran at {DateTimeOffset.Now}");
            return Task.CompletedTask;
        }
    }
}
