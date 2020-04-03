using System.Threading.Tasks;
using StamAcasa.Common.Notifications;

namespace StamAcasa.Common.Services
{
    public interface IQueue
    {
        Task Queue(INotification notification);

        Task<INotification> Dequeue();
    }
}
