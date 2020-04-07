using System.Collections.Generic;

namespace StamAcasa.Common.Services.Emailing
{
    public class EmailRequestModel
    {
        public string Address { get; set; }
        public string Type { get; set; }
        public Dictionary<string, string> PlaceholderContent { get; set; }
        public EmailTemplate TemplateType { get; set; }
    }
}
