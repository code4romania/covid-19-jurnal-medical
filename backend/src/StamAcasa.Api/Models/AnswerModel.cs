using Newtonsoft.Json;

namespace StamAcasa.Api.Models
{
    public class AnswerModel
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("questionText")]
        public string QuestionText { get; set; }

        [JsonProperty("answer", NullValueHandling = NullValueHandling.Ignore)]
        public string Answer { get; set; }
    }
}