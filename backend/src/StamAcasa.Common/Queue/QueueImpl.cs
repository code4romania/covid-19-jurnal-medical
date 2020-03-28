using StamAcasa.Common.Notifications;
using StamAcasa.Common.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public void Queue(INotification notification)
        {
            throw new NotImplementedException();
        }
    }
}
