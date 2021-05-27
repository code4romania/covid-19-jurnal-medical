﻿using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services.Emailing
{
    public class SmtpSender : IEmailSender
    {
        private readonly SmtpOptions _options;

        public SmtpSender(SmtpOptions options)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));
        }

        public async Task SendAsync(Email email, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(email.To))
            {
                return;
            }

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_options.Host, _options.Port, SecureSocketOptions.Auto, cancellationToken);

                await client.AuthenticateAsync(_options.User, _options.Password, cancellationToken);

                var body = new TextPart(TextFormat.Html) { Text = email.Content };
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(email.FromName, email.FromEmail));
                message.Sender = new MailboxAddress(email.FromName, email.FromEmail);
                message.Subject = email.Subject;
                message.Body = body;
                message.To.Add(new MailboxAddress(email.To));

                if (email.Attachment != null)
                {
                    var attachment = new MimePart("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    {
                        Content = new MimeContent(new MemoryStream(email.Attachment.Content)),
                        ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                        ContentTransferEncoding = ContentEncoding.Base64,
                        FileName = email.Attachment.FileName
                    };
                    var multipart = new Multipart("mixed");
                    multipart.Add(body);
                    multipart.Add(attachment);

                    message.Body = multipart;
                }
                else
                {
                    message.Body = body;
                }

                await client.SendAsync(message, cancellationToken);
                await client.DisconnectAsync(true, cancellationToken);
            }
        }
    }
}
