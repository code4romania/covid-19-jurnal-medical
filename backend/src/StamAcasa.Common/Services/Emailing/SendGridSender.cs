using System;
using System.Collections.Generic;
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
            // note that SendGridClient doesn't implement IDisposable,
            // so if we start using this in production mode, we should refactor this
            // if there's a single api key, then we should be fine with an instance property
            // otherwise, we should be looking at creating a pool of SendGridClients
            // a nice read on this: https://github.com/sendgrid/sendgrid-csharp/issues/658
            var client = new SendGridClient(_options.ApiKey);
            var message = new SendGridMessage
            {
                From = new EmailAddress(email.FromEmail, email.FromName),
                Subject = email.Subject,
                PlainTextContent = email.Content,
                HtmlContent = email.Content
            };
            if (email.Attachment != null)
            {
                message.Attachments = new List<Attachment>
                {
                    new Attachment
                    {
                        Filename = email.Attachment.FileName,
                        Content = Convert.ToBase64String(email.Attachment.Content)
                    }
                };
            }

            message.AddTo(new EmailAddress(email.To));
            message.SetClickTracking(_options.ClickTracking, _options.ClickTracking);

            await client.SendEmailAsync(message, cancellationToken);
        }
    }
}
