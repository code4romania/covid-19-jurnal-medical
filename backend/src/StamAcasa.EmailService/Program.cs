using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
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
                {

                    return new ConnectionFactory()
                    {
                        HostName = context.Configuration["RabbitMQ:HostName"],
                        UserName = context.Configuration["RabbitMQ:User"],
                        Password = context.Configuration["RabbitMQ:Password"],
                        DispatchConsumersAsync = true // this is mandatory to have Async Subscribers
                    };
                });

                services.AddSingleton<ISender>(ctx =>
                {
                    var options = new MailOptions()
                    {
                        Host = context.Configuration["SMTP:HostName"],
                        Port = context.Configuration.GetValue<int>("SMTP:Port"),
                        UseSsl = context.Configuration.GetValue<bool>("SMTP:UseSsl"),
                        User = context.Configuration["SMTP:User"],
                        Password = context.Configuration["SMTP:Password"]
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