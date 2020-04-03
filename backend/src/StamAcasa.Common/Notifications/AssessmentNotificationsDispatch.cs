using System.Linq;
using System.Threading.Tasks;
using StamAcasa.Common.Services;

namespace StamAcasa.Common.Notifications
{
    public class AssessmentNotificationsDispatch : INotificationsDispatch
    {
        private IUserService UserService { get; }

        private IQueue Queue { get; }

        public AssessmentNotificationsDispatch(IUserService userService, IQueue queue)
        {
            UserService = userService;
            Queue = queue;
        }

        public async Task Process()
        {
            var userInfos = await UserService.GetAll();
            var notifications = userInfos.Select(u => new AssessmentNotification(u));
            var qTasks = notifications.Select(n => Queue.Queue(n));
            await Task.WhenAll(qTasks);
        }
    }
}
