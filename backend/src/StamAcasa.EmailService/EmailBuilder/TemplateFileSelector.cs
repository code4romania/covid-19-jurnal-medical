using Microsoft.Extensions.Configuration;
using StamAcasa.EmailService.EmailBuilder.Models;
using System.IO;
using System.Reflection;

namespace StamAcasa.EmailService.EmailBuilder
{
    public class TemplateFileSelector : ITemplateFileSelector
    {
        private readonly IConfiguration _configuration;

        public TemplateFileSelector(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetTemplatePath(Models.EmailTemplate template)
        {
            var targetDirectory = _configuration.GetValue<string>("TemplateFolder");
            var directory = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), targetDirectory);

            var filePath = string.Empty;
            switch (template)
            {
                case EmailTemplate.AccountConfirmation:
                    filePath = "accountConfirmationTemplate.html";
                    break;
                case EmailTemplate.DailyAssessment:
                    filePath = "dailyAssessmentTemplate.html";
                    break;
                case EmailTemplate.StateEntity:
                    filePath = "stateEntityTemplate.html";
                    break;
            }

            return Path.Combine(directory, filePath);
        }
    }
}
