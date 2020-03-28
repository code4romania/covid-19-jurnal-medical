using System;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Notifications
{
    public class AssessmentNotification : INotification
    {
        public Guid Id { get; }

        private UserInfo UserInfo { get; }

        public AssessmentNotification(UserInfo userInfo)
        {
            Id = Guid.NewGuid();
            UserInfo = userInfo;
        }
    }
}
