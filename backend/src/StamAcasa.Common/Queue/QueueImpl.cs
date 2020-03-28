using System;
using System.Threading.Tasks;
using StamAcasa.Common.Notifications;
using StamAcasa.Common.Services;

namespace StamAcasa.Common.Queue
{
    class QueueImpl : IQueue
    {
        private readonly INotification _notification;

        public QueueImpl(INotification notification)
        {
            _notification = notification;
        }

        public Task<INotification> Dequeue()
        {
            throw new NotImplementedException();
        }

        public Task Queue(INotification notification)
        {
            throw new NotImplementedException();
        }
    }
}
