using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StamAcasa.EmailService.EmailBuilder;
using StamAcasa.EmailService.Subscriber;

namespace StamAcasa.EmailService
{
    public class Worker : BackgroundService
    {
        private readonly ISubscriber _subscriber;
        private readonly IEmailBuilderService _emailBuilder;
        private readonly ILogger<Worker> _logger;

        public Worker(ISubscriber subscriber, IEmailBuilderService emailBuilder, ILogger<Worker> logger)
        {
            _subscriber = subscriber ??
                throw new ArgumentNullException(nameof(subscriber));
            _emailBuilder = emailBuilder;
            _logger = logger;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Email service is starting...");

            _subscriber.Subscribe("email:requests", async (request) =>
            {
                var email = await _emailBuilder.BuildEmail(request);

                _logger.LogInformation($"TO: {email.Address}; Subject: {email.Subject}; Content: {email.Content}");
            });

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
            _subscriber.Dispose();

            base.Dispose();
        }
    }
}