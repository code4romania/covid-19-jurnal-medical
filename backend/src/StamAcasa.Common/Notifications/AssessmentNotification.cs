using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using StamAcasa.Common.DTO;

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

        public byte[] GetBytes()
        {
            var bf = new BinaryFormatter();
            using (var ms = new MemoryStream())
            {
                bf.Serialize(ms, this);
                return ms.ToArray();
            }
        }
    }
}
