using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.Emailing;

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
            var userInfos = await UserService.GetAllParents();
            var notifications = userInfos.Select(CreateEmailRequest);
            var qTasks = notifications.Select(n => _queueService.PublishEmailRequest(n));
            await Task.WhenAll(qTasks);
        }

        private EmailRequestModel CreateEmailRequest(UserInfo userInfo)
        {
            return new EmailRequestModel
            {
                Address = userInfo.Email,
                TemplateType = EmailTemplate.DailyAssessment,
                Type = "dailyAssessment",
                PlaceholderContent = new Dictionary<string, string>
                {
                    { "name", $"{userInfo.Name} {userInfo.Surname}" }
                }
            };
        }
    }
}
