using System;
using System.Threading.Tasks;

namespace StamAcasa.Common.Queue
{
    public interface IQueueService : IDisposable
    {
        Task PublishNotification<T>(T message) where T : class;
        Task PublishEmailRequest<T>(T message) where T : class;
        void SubscribeConsumerToNotificationsQueue<T>(Func<T, Task> messageHandler) where T : class;
        void SubscribeConsumerToEmailRequestsQueue<T>(Func<T, Task> messageHandler) where T : class;

        Task PublishUserRequest<T>(T message) where T : class;
        void SubscribeConsumerToUserRequestsQueue<T>(Func<T, Task> messageHandler) where T : class;
    }
}
