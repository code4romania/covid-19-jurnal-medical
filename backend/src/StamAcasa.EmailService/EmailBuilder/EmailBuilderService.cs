
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.EmailService;
using StamAcasa.Common.Models;

namespace StamAcasa.EmailService.EmailBuilder
{
    public class EmailBuilderService : IEmailBuilderService
    {
        private readonly ILogger<IEmailBuilderService> _logger;
        private readonly ITemplateFileSelector _templateFileSelector;

        public EmailBuilderService(ILogger<IEmailBuilderService> logger, ITemplateFileSelector templateFileSelector)
        {
            _logger = logger;
            _templateFileSelector = templateFileSelector;
        }
        public async Task<Email> BuildEmail(EmailRequestModel emailRequest)
        {
            _logger.LogInformation("Build email");

            var filePath = _templateFileSelector.GetTemplatePath(emailRequest.TemplateType);
            using (var streamReader = File.OpenText(filePath))
            {
                string template = await streamReader.ReadToEndAsync();
                template = FormatTemplate(template, emailRequest);
                var emailModel = new Email
                {
                    To = emailRequest.Address,
                    Subject = "New Email",
                    Content = template
                };

                return emailModel;
            }
        }

        private string FormatTemplate(string template, EmailRequestModel emailRequest)
        {
            foreach (var placeholder in emailRequest.PlaceholderContent)
            {
                template = template.Replace($"%%{placeholder.Key}%%", placeholder.Value);
            }

            return template;
        }
    }
}
