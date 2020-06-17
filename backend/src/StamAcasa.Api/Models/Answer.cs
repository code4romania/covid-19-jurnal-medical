using Newtonsoft.Json;

namespace StamAcasa.Api.Models
{
    public class Answer
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("questionText")]
        public string QuestionText { get; set; }

        [JsonProperty("answer", NullValueHandling = NullValueHandling.Ignore)]
        public string AnswerAnswer { get; set; }
    }
}