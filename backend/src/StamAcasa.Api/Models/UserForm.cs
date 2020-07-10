using System;
using IdentityModel;
using Newtonsoft.Json;


namespace StamAcasa.Api.Models
{
    public class UserForm
    {
        [JsonProperty("formId")]
        public long FormId { get; set; }

        [JsonProperty("timestamp")]
        public long Timestamp { get; }

        [JsonProperty("answers")]
        public AnswerModel[] Answers { get; set; }

        public UserForm()
        {
            Timestamp = DateTime.UtcNow.ToEpochTime();
        }
    }
}