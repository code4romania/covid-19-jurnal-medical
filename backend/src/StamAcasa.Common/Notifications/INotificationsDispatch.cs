using System.Threading.Tasks;

namespace StamAcasa.Common.Notifications
{
    public interface INotificationsDispatch
    {
        Task Process();
    }
}
