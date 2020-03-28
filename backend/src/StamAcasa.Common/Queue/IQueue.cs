using StamAcasa.Common.Notifications;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StamAcasa.Common.Services
{
    interface IQueue
    {
        void Queue(INotification notification);

        Task<INotification> Dequeue();
    }
}
