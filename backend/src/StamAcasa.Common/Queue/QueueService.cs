using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EasyNetQ;
using EasyNetQ.Topology;
using Microsoft.Extensions.Logging;
using Polly;

namespace StamAcasa.Common.Queue
{
    public class QueueService : IQueueService
    {
        private const string EmailRequestsQueueName = "email:requests";
        private readonly IBus _bus;
        private readonly ILogger<QueueService> _logger;

        private readonly Dictionary<string, IQueue> _availableQueues = new Dictionary<string, IQueue>();
        public QueueService(IBus bus, ILogger<QueueService> logger)
        {
            _bus = bus;
            _logger = logger;
            var retryPolicy = Policy
                .HandleResult<bool>(false)
                .WaitAndRetry(5, retryAttempt =>
                    TimeSpan.FromSeconds(Math.Pow(2, retryAttempt))
                );
            retryPolicy.Execute(() => CreateQueues());
        }

        private bool CreateQueues()
        {
            if (!_bus.IsConnected)
            {
                _logger.LogInformation("bus is not connected yet will retry");
                return false;
            }
            // register queues
            IQueue queueDeclare = _bus.Advanced.QueueDeclare(EmailRequestsQueueName);

            // add them to dictionary
            _availableQueues.Add(EmailRequestsQueueName, queueDeclare);

            return true;
        }

        public async Task PublishNotification<T>(T message) where T : class
        {
            throw new NotImplementedException("to do");
        }

        public async Task PublishEmailRequest<T>(T message) where T : class
        {
            var messageWrapper = new Message<T>(message);
            await _bus.Advanced.PublishAsync(Exchange.GetDefault(), EmailRequestsQueueName, false, messageWrapper);
        }

        public void SubscribeConsumerToNotificationsQueue<T>(Func<T, Task> messageHandler) where T : class
        {
            throw new NotImplementedException("to do ");
        }

        public void SubscribeConsumerToEmailRequestsQueue<T>(Func<T, Task> messageHandler) where T : class
        {
            var emailQueue = _availableQueues[EmailRequestsQueueName];

            _bus.Advanced.Consume(emailQueue, x => x.Add<T>(async (message, info) =>
            {
                try
                {
                    await messageHandler(message.Body).ConfigureAwait(false);

                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error in consumer.");
                }
            }));
        }

        public void Dispose()
        {
            _bus?.Dispose();
        }
    }

    public interface IQueueService : IDisposable
    {
        Task PublishNotification<T>(T message) where T : class;
        Task PublishEmailRequest<T>(T message) where T : class;
        void SubscribeConsumerToNotificationsQueue<T>(Func<T, Task> messageHandler) where T : class;
        void SubscribeConsumerToEmailRequestsQueue<T>(Func<T, Task> messageHandler) where T : class;
    }
}
