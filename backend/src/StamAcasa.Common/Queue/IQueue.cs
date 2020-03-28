using System.Threading.Tasks;
using StamAcasa.Common.Notifications;

namespace StamAcasa.Common.Services
{
    interface IQueue
    {
        Task Queue(INotification notification);

        Task<INotification> Dequeue();
    }
}
