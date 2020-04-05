using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EasyNetQ;
using EasyNetQ.Topology;

namespace StamAcasa.Common.Queue
{
    public class QueueService : IQueueService
    {
        private const string EmailRequestsQueueName = "email:requests";
        private readonly IBus _bus;

        private readonly Dictionary<string, IQueue> _availableQueues = new Dictionary<string, IQueue>();
        public QueueService(IBus bus)
        {
            _bus = bus;
            // register queues
            IQueue queueDeclare = _bus.Advanced.QueueDeclare(EmailRequestsQueueName);

            // add them to dictionary
            _availableQueues.Add(EmailRequestsQueueName, queueDeclare);

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
                await messageHandler(message.Body);
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
