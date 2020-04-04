using StamAcasa.EmailService.EmailBuilder.Models;
using System.Collections.Generic;

namespace StamAcasa.EmailService.EmailBuilder
{
    public class EmailRequestModel
    {
        public string Address { get; set; }
        public string Type { get; set; }
        public Dictionary<string, string> PlaceholderContent { get; set; }
        public EmailTemplate TemplateType { get; set; }
    }
}
