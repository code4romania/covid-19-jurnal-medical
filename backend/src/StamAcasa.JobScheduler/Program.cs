using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StamAcasa.JobScheduler.Extensions;
using StamAcasa.JobScheduler.Jobs;

namespace StamAcasa.JobScheduler
{
    internal static class Program
    {
        private static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<JobScheduler>()
                        .AddLogging();

                    services.TryAddScheduledJob<TestJob>();
                    //services.AddTransient<SendAssessmentReminderJob>();
                    //services.AddTransient<SendResultsNotificationJob>();
                });
    }
}
