using EasyNetQ;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.EmailService.EmailBuilder;

namespace StamAcasa.EmailService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .UseWindowsService()
            .ConfigureAppConfiguration((context, config) =>
            {
                var env = context.HostingEnvironment;

                // configure the app here.
                config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)        // { "Parent": { "Child": value } } is queried using "Parent:Child"
                    .AddJsonFile($"appsettings.{env}.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables();                                                     // { "Parent": { "Child": value } } is equivalent to variable Parent__Child

                if (args != null)
                {
                    config.AddCommandLine(args);
                }
            })
            .ConfigureServices((context, services) =>
            {

                var hostName = context.Configuration["RabbitMQ:HostName"];
                var userName = context.Configuration["RabbitMQ:User"];
                var port = ushort.Parse(context.Configuration["RabbitMQ:Port"]);
                var password = context.Configuration["RabbitMQ:Password"];

                services.AddSingleton(RabbitHutch.CreateBus(
                    hostName,
                    port,
                    "/",
                    userName,
                    password,
                    10, //default
                    (x) => { }));

                services.AddSingleton<IEmailSender>(ctx =>
                    new SmtpSender(
                        new SmtpOptions
                        {
                            Host = context.Configuration["Smtp:Host"],
                            Port = context.Configuration.GetValue<int>("Smtp:Port"),
                            User = context.Configuration["Smtp:User"],
                            Password = context.Configuration["Smtp:Password"]
                        }
                    )
                );

                services.AddTransient<IEmailBuilderService, EmailBuilderService>();
                services.AddSingleton<IQueueService, QueueService>();

                services.AddHostedService<Worker>();

            });
    }
}