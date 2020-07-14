using System;
using Newtonsoft.Json;

namespace StamAcasa.Common.Models
{
    public class UserForm
    {
        [JsonProperty("formId")]
        public long FormId { get; set; }

        [JsonProperty("timestamp")]
        public long Timestamp { get; set; }

        [JsonProperty("answers")]
        public AnswerModel[] Answers { get; set; }

        public UserForm()
        {
            Timestamp = ToEpochTime(DateTime.UtcNow);
        }

        private static int ToEpochTime(DateTime dateTime)
        {
            var date = dateTime.ToUniversalTime();
            var ticks = date.Ticks - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc).Ticks;
            var ts = ticks / TimeSpan.TicksPerSecond;
            return (int)ts;
        }
    }
}