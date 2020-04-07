using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.Queue;
using StamAcasa.EmailService.Worker;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StamAcasa.EmailService
{
    public class EmailService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;
        private readonly IQueueService _queueService;

        private IWorker[] _workers;

        public EmailService(IQueueService queueService, IServiceProvider serviceProvider, IConfiguration configuration, ILogger<EmailService> logger)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
            _queueService = queueService;
            _logger = logger;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Email service is starting...");

            var workerCount =_configuration.GetValue<int>("WorkerCount");
            _workers = Enumerable.Range(1, workerCount).Select(instanceId =>
            {
                var worker = (IWorker)_serviceProvider.GetService(typeof(IWorker));
                worker.StartWork(instanceId);
                return worker;
            })
            .ToArray();            

            return base.StartAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.CompletedTask;
        }

        public override Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Email service is stopping...");

            return base.StopAsync(cancellationToken);
        }

        public override void Dispose()
        {
            _queueService.Dispose();
            base.Dispose();
        }
    }
}