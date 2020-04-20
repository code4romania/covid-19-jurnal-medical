using System;
using System.IO;
using AutoMapper;
using EasyNetQ;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Enrichers;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using StamAcasa.Common;
using StamAcasa.Common.Models;
using StamAcasa.Common.Notifications;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.Excel;
using StamAcasa.JobScheduler.Extensions;
using StamAcasa.JobScheduler.Jobs;

namespace StamAcasa.JobScheduler
{
    internal static class Program
    {
        private static void Main(string[] args)
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

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<JobScheduler>()
                        .AddLogging();

                    services.AddAutoMapper(typeof(Program), typeof(UserDbContext));
                    services.AddDbContextPool<UserDbContext>(options =>
                        options.UseNpgsql(hostContext.Configuration.GetConnectionString("UserDBConnection")));

                    services.AddSingleton(RabbitHutch.CreateBus(string.Format("host={0}:{1};username={2};password={3}",
                        hostContext.Configuration.GetValue<string>("RabbitMQ:HostName"),
                        hostContext.Configuration.GetValue<int>("RabbitMQ:Port").ToString(),
                        hostContext.Configuration.GetValue<string>("RabbitMQ:User"),
                        hostContext.Configuration.GetValue<string>("RabbitMQ:Password"))
                    ));

                    services.TryAddScheduledJob<HealthCheckJob>();
                    services.TryAddScheduledJob<SendAssessmentReminderJob>(s =>
                    {
                        s.TryAddTransient<AssessmentNotificationsDispatch>();
                        s.TryAddSingleton<IQueueService, QueueService>();
                        s.TryAddTransient<IUserService, UserService>();

                    });

                    services.TryAddScheduledJob<SendResultsNotificationJob>(s =>
                    {
                        s.TryAddTransient<ResultNotificationsDispatch>();
                        s.TryAddTransient<IFormService, FormService>();
                        s.TryAddTransient<IAnswersExcelExporter, AnswersExcelExporter>();
                        s.TryAddTransient<IExcelDocumentService, ExcelDocumentService>();

                        CountyEmailDistribution countyEmailDistribution = new CountyEmailDistribution();
                        hostContext.Configuration.GetSection(nameof(CountyEmailDistribution)).Bind(countyEmailDistribution);
                        s.TryAddSingleton(countyEmailDistribution);
                    });
                });
    }
}
