using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using StamAcasa.EmailService.EmailBuilder.Models;

namespace StamAcasa.EmailService.EmailBuilder
{
    public class EmailBuilderService : IEmailBuilderService
    {
        private readonly ILogger<IEmailBuilderService> _logger;
        private readonly IConfiguration _configuration;

        public EmailBuilderService(ILogger<IEmailBuilderService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

        }
        public async Task<EmailModel> BuildEmail(EmailRequestModel emailRequest)
        {
            _logger.LogInformation("Build email");
            var targetDirectory = _configuration.GetValue<string>("TemplateFolder");
            var directory = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), targetDirectory);

            var filePath = Path.Combine(directory, "template.html");
            using (var streamReader = File.OpenText(filePath))
            {
                string template = await streamReader.ReadToEndAsync();
                template = FormatTemplate(template, emailRequest);
                var emailModel = new EmailModel
                {
                    Address = emailRequest.Address,
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
