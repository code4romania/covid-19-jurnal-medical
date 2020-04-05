using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace StamAcasa.JobScheduler.Jobs
{
    internal class TestJob : IScheduledJob
    {
        private readonly ILogger<TestJob> _logger;

        public TestJob(ILogger<TestJob> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task RunAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Job {nameof(TestJob)} ran at {DateTimeOffset.Now}");
            return Task.CompletedTask;
        }
    }
}
