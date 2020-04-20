using System;
using System.IO;
using EasyNetQ;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Enrichers;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.EmailService.EmailBuilder;
using StamAcasa.EmailService.Worker;

namespace StamAcasa.EmailService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            const string loggerTemplate = @"{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u4}]<{ThreadId}> [{SourceContext:l}] {Message:lj}{NewLine}{Exception}";
            var baseDir = AppDomain.CurrentDomain.BaseDirectory;
            var logfile = Path.Combine(baseDir, "logs", "log.txt");
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .Enrich.With(new ThreadIdEnricher())
                .Enrich.FromLogContext()
                .WriteTo.Console(LogEventLevel.Information, loggerTemplate, theme: AnsiConsoleTheme.Literate)
                .WriteTo.File(logfile, LogEventLevel.Information, loggerTemplate,
                    rollingInterval: RollingInterval.Day, retainedFileCountLimit: 90)
                .CreateLogger();

            try
            {
                Log.Information("====================================================================");
                Log.Information($"Application Starts. Version: {System.Reflection.Assembly.GetEntryAssembly()?.GetName().Version}");
                Log.Information($"Application Directory: {AppDomain.CurrentDomain.BaseDirectory}");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception e)
            {
                Log.Fatal(e, "Application terminated unexpectedly");
            }
            finally
            {
                Log.Information("====================================================================\r\n");
                Log.CloseAndFlush();
            }
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

                services.AddSingleton(RabbitHutch.CreateBus(string.Format("host={0}:{1};username={2};password={3}",
                    context.Configuration.GetValue<string>("RabbitMQ:HostName"),
                    context.Configuration.GetValue<int>("RabbitMQ:Port").ToString(),
                    context.Configuration.GetValue<string>("RabbitMQ:UserName"),
                    context.Configuration.GetValue<string>("RabbitMQ:Password"))
                ));

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

                services.AddSingleton<IMemoryCache, MemoryCache>();
                services.AddSingleton<ITemplateFileSelector, TemplateFileSelector>();
                services.AddTransient<IEmailBuilderService, EmailBuilderService>();
                services.AddSingleton<IQueueService, QueueService>();

                services.AddTransient<IWorker, EmailWorker>();

                services.AddHostedService<EmailService>();
            })
            .UseSerilog();
    }
}