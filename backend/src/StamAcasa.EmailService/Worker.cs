using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.EmailService.EmailBuilder;

namespace StamAcasa.EmailService
{
    public class Worker : BackgroundService
    {
        private readonly IEmailBuilderService _emailBuilder;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<Worker> _logger;
        private readonly IQueueService _queueService;

        public Worker(IQueueService queueService, IEmailBuilderService emailBuilder, IEmailSender emailSender, ILogger<Worker> logger)
        {
            _queueService = queueService ??
                            throw new ArgumentNullException(nameof(queueService));
            _emailBuilder = emailBuilder;
            _emailSender = emailSender;
            _logger = logger;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Email service is starting...");

            _queueService.SubscribeConsumerToEmailRequestsQueue<EmailRequestModel>(async (request) =>
          {
              try
              {
                  var email = await _emailBuilder.BuildEmail(request);


                  _logger.LogInformation($"TO: {email.To}; Subject: {email.Subject}; Content: {email.Content}; Status: sending");

                  await _emailSender.SendAsync(email, cancellationToken);

                  _logger.LogInformation($"TO: {email.To}; Subject: {email.Subject}; Content: {email.Content}; Status: sent");
              }

              catch (Exception ex)
              {
                  _logger.LogError(ex, ex.Message);
              }
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
            _queueService.Dispose();
            base.Dispose();
        }
    }
}