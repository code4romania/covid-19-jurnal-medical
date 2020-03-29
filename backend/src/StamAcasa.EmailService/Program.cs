using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using StamAcasa.EmailService.EmailBuilder;
using StamAcasa.EmailService.Mailing;
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
                // configure the app here.
            })
            .ConfigureServices((context, services) =>
            {
                services.AddSingleton<IConnectionFactory>(ctx =>
                {

                    return new ConnectionFactory()
                    {
                        HostName = context.Configuration["RabbitMQ:HostName"],
                        DispatchConsumersAsync = true // this is mandatory to have Async Subscribers
                    };
                });

                services.AddSingleton<ISender>(ctx =>
                {
                    var options = new MailOptions()
                    {
                        Host = context.Configuration["SMTP:HostName"],
                        User = "<user>",
                        Password = "<password>"
                    };

                    return new SmtpSender(options);
                });

                services.AddSingleton<IBusConnection, RabbitMQPersistentConnection>();
                services.AddSingleton<IQueueSubscriber, EmailQueueSubscriber>();

                services.AddTransient<IEmailBuilderService, EmailBuilderService>();

                services.AddHostedService<Worker>();

            });
    }
}