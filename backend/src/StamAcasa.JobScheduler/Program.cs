using AutoMapper;
using EasyNetQ;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StamAcasa.Common;
using StamAcasa.Common.Models;
using StamAcasa.Common.Notifications;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.Common.Services.Excel;
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

                    services.AddAutoMapper(typeof(Program), typeof(UserDbContext));
                    services.AddDbContextPool<UserDbContext>(options =>
                        options.UseNpgsql(hostContext.Configuration.GetConnectionString("UserDBConnection")));

                    var hostName = hostContext.Configuration["RabbitMQ:HostName"];
                    var userName = hostContext.Configuration["RabbitMQ:User"];
                    var port = ushort.Parse(hostContext.Configuration["RabbitMQ:Port"]);
                    var password = hostContext.Configuration["RabbitMQ:Password"];

                    services.TryAddSingleton(sp => RabbitHutch.CreateBus(
                        hostName,
                        port,
                        "/",
                        userName,
                        password,
                        10, //default
                        (x) => { }));

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
