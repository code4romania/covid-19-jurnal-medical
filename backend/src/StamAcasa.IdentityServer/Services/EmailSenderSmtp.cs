using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace StamAcasa.IdentityServer.Services {
    public class EmailSenderSmtp : IEmailSender {
        private readonly SmtpSenderOptions _options;
        private string _adminEmail;

        public EmailSenderSmtp(IOptions<SmtpSenderOptions> options, IConfiguration config)
        {
            _options = options.Value;
            _adminEmail = config.GetValue<string>("AdminEmailAddress");
        }
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var client = new SmtpClient(_options.SmtpServer)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_options.SmtpUser, _options.SmtpPassword)
            };

            var mailMessage = new MailMessage {From = new MailAddress(_adminEmail) };
            mailMessage.To.Add(email);
            mailMessage.Body = htmlMessage;
            mailMessage.Subject = subject;
            client.Send(mailMessage);
        }
    }
}
