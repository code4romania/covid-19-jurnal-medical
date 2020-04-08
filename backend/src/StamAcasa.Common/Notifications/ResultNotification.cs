using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace StamAcasa.Common.Notifications
{
    public class ResultNotification : INotification
    {
        public Guid Id { get; }

        public byte[] GetBytes()
        {
            var formatter = new BinaryFormatter();
            using (var stream = new MemoryStream())
            {
                formatter.Serialize(stream, this);
                return stream.ToArray();
            }
        }
    }
}
