using Microsoft.Extensions.Configuration;
using StamAcasa.Common.Services.Emailing;
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

        public string GetTemplatePath(EmailTemplate template)
        {
            var targetDirectory = _configuration.GetValue<string>("TemplateFolder");
            var directory = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), targetDirectory);
            var filePath = EmailConstants.GetTemplatePath(template);

            return Path.Combine(directory, filePath);
        }
    }
}
