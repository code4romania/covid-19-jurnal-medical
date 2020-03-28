using System;

namespace StamAcasa.Common.Notifications
{
    public class AssesmentNotification : INotification
    {
        public Guid Id { get; }

        public AssesmentNotification()
        {
            Id = Guid.NewGuid();
        }

    }
}
