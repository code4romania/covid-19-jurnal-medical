using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.EmailService.EmailBuilder;
using StamAcasa.EmailService.Messaging;

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
                services.AddSingleton<IConnectionFactory>(ctx =>
                    new ConnectionFactory
                    {
                        HostName = context.Configuration["RabbitMQ:HostName"],
                        UserName = context.Configuration["RabbitMQ:User"],
                        Password = context.Configuration["RabbitMQ:Password"],
                        DispatchConsumersAsync = true // this is mandatory to have Async Subscribers
                    }
                );

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

                services.AddSingleton<IBusConnection, RabbitMQPersistentConnection>();
                services.AddSingleton<IQueueSubscriber, EmailQueueSubscriber>();

                services.AddSingleton<ITemplateFileSelector, TemplateFileSelector>();
                services.AddTransient<IEmailBuilderService, EmailBuilderService>();

                services.AddHostedService<Worker>();
            });
    }
}