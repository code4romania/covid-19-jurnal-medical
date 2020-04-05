using System.Linq;
using System.Threading.Tasks;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;

namespace StamAcasa.Common.Notifications
{
    public class AssessmentNotificationsDispatch : INotificationsDispatch
    {
        private IUserService UserService { get; }

        private readonly IQueueService _queueService;

        public AssessmentNotificationsDispatch(IUserService userService, IQueueService queueService)
        {
            UserService = userService;
            _queueService = queueService;
        }

        public async Task Process()
        {
            var userInfos = await UserService.GetAll();
            var notifications = userInfos.Select(u => new AssessmentNotification(u));
            var qTasks = notifications.Select(n => _queueService.PublishNotification(n));
            await Task.WhenAll(qTasks);
        }
    }
}
