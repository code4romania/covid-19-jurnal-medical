using System;
using System.Security.Authentication;
using System.Threading;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using StamAcasa.EmailService.EmailBuilder.Models;

namespace StamAcasa.EmailService.Mailing
{
    public class SmtpSender : ISender
    {
        private readonly MailOptions _options;

        public SmtpSender(MailOptions options)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));
        }

        public async Task SendAsync(EmailModel email, CancellationToken cancellationToken)
        {
            using (var client = new SmtpClient())
            {
                client.SslProtocols = SslProtocols.Ssl3 | SslProtocols.Tls | SslProtocols.Tls11 | SslProtocols.Tls12 | SslProtocols.Tls13;

                await client.ConnectAsync(_options.Host, 465, true, cancellationToken);

                // Note: only needed if the SMTP server requires authentication
                await client.AuthenticateAsync(_options.User, _options.Password, cancellationToken);


                var messageToSend = BuildMessage(email);
                await client.SendAsync(messageToSend);
                await client.DisconnectAsync(true);
            }
        }

        private MimeMessage BuildMessage(EmailModel request)
        {
            var messageToSend = new MimeMessage
            {
                Sender = new MailboxAddress("Echipa StamAcasa", "echipa@stamacasa.ro"),
                Subject = request.Subject,
            };

            messageToSend.Body = new TextPart(TextFormat.Html) { Text = request.Content };

            messageToSend.To.Add(new MailboxAddress(request.Address));

            return messageToSend;

        }
    }
}