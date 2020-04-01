using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace StamAcasa.JobScheduler
{
    internal static class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<JobScheduler>();
                    services.AddTransient<TestJob>();
                });
    }
}
