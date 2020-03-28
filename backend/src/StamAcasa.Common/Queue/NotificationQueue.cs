using System;
using System.Threading.Tasks;
using StamAcasa.Common.Notifications;
using StamAcasa.Common.Services;

namespace StamAcasa.Common.Queue
{
    public class NotificationQueue : IQueue
    {
        private readonly INotification _notification;

        public NotificationQueue(INotification notification)
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
