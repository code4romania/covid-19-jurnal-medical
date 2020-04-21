using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.Emailing;

namespace StamAcasa.Common.Notifications
{
    public class AssessmentNotificationsDispatch : INotificationsDispatch
    {
        private IUserService UserService { get; }

        private readonly IQueueService _queueService;
        private readonly UserProfileUrls _userProfileUrls;

        public AssessmentNotificationsDispatch(IUserService userService, IQueueService queueService, UserProfileUrls userProfileUrls)
        {
            UserService = userService;
            _queueService = queueService;
            _userProfileUrls = userProfileUrls;
        }

        public async Task Process()
        {
            var userInfos = await UserService.GetAll();
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
                    { "name", $"{userInfo.Name} {userInfo.Surname}" },
                    { "evaluationLink", _userProfileUrls.Evaluation }
                }
            };
        }
    }
}
