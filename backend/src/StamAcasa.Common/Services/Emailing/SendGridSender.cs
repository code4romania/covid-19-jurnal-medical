using System;
using System.Threading;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services.Emailing
{
    public class SendGridSender : IEmailSender
    {
        private readonly SendGridOptions _options;

        public SendGridSender(SendGridOptions options)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));
        }

        public async Task SendAsync(Email email, CancellationToken cancellationToken)
        {
            var client = new SendGridClient(_options.ApiKey);
            var message = new SendGridMessage
            {
                From = new EmailAddress(email.FromEmail, email.FromName),
                Subject = email.Subject,
                PlainTextContent = email.Content,
                HtmlContent = email.Content
            };

            message.AddTo(new EmailAddress(email.To));
            message.SetClickTracking(_options.ClickTracking, _options.ClickTracking);

            await client.SendEmailAsync(message, cancellationToken);
        }
    }
}
