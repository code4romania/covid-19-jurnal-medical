using System;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Notifications
{
    public class AssesmentNotification : INotification
    {
        public Guid Id { get; }

        private UserInfo UserInfo { get; }

        public AssesmentNotification(UserInfo userInfo)
        {
            Id = Guid.NewGuid();
            UserInfo = userInfo;
        }
    }
}
