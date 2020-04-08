using Microsoft.Extensions.Logging;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.EmailService.EmailBuilder;
using System;
using System.Threading;

namespace StamAcasa.EmailService.Worker
{
    public class EmailWorker : IWorker
    {
        private readonly IEmailBuilderService _emailBuilder;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<EmailWorker> _logger;
        private readonly IQueueService _queueService;

        public EmailWorker(IQueueService queueService, IEmailBuilderService emailBuilder, IEmailSender emailSender, ILogger<EmailWorker> logger)
        {
            _queueService = queueService;
            _emailBuilder = emailBuilder;
            _emailSender = emailSender;
            _logger = logger;
        }

        public void StartWork(int instanceId)
        {
            _logger.LogInformation($"Worker {instanceId} service is starting...");

            _queueService.SubscribeConsumerToEmailRequestsQueue<EmailRequestModel>(async (request) =>
            {
                try
                {
                    var email = await _emailBuilder.BuildEmail(request);

                    _logger.LogInformation($"TO: {email.To}; Subject: {email.Subject}; Content: {email.Content}; Status: sending");

                    await _emailSender.SendAsync(email, new CancellationToken());

                    _logger.LogInformation($"TO: {email.To}; Subject: {email.Subject}; Content: {email.Content}; Status: sent");
                }

                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.Message);
                    throw;
                }
            });
        }
    }
}
