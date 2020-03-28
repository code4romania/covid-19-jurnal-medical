using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;

namespace StamAcasa.IdentityServer.Services {
    public class EmailSenderSendGrid : IEmailSender {
        private string _adminEmail;

        public EmailSenderSendGrid(IOptions<AuthMessageSenderOptions> optionsAccessor, IConfiguration config) {
            Options = optionsAccessor.Value;
            _adminEmail = config.GetValue<string>("AdminEmailAddress");
        }

        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

        public Task SendEmailAsync(string email, string subject, string message) {
            return Execute(Options.SendGridKey, subject, message, email);
        }

        public Task Execute(string apiKey, string subject, string message, string email) {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage() {
                From = new EmailAddress(_adminEmail, Options.SendGridUser),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));

            msg.SetClickTracking(false, false);

            return client.SendEmailAsync(msg);
        }
    }
}

