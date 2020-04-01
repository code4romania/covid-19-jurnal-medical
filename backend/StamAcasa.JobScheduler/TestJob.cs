using System;
using System.Threading;
using System.Threading.Tasks;

namespace StamAcasa.JobScheduler
{
    internal class TestJob : IScheduledJob
    {
        public Task ExecuteAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine($"Job {nameof(TestJob)} ran at {DateTimeOffset.Now}");
            return Task.CompletedTask;
        }
    }
}
