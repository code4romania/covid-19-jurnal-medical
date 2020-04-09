using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.Common.Services.Excel;

namespace StamAcasa.Common.Notifications
{
    public class ResultNotificationsDispatch : INotificationsDispatch
    {
        private readonly ILogger<ResultNotificationsDispatch> _logger;
        private readonly IFormService _formService;
        private readonly IEmailSender _emailSender;
        private readonly IAnswersExcelExporter _answersExcelExporter;
        private readonly CountyEmailDistribution _countyEmailDistribution;

        public ResultNotificationsDispatch(ILogger<ResultNotificationsDispatch> logger,
            IFormService formService,
            IEmailSender emailSender,
            IAnswersExcelExporter answersExcelExporter,
            CountyEmailDistribution countyEmailDistribution
        )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _formService = formService;
            _emailSender = emailSender;
            _answersExcelExporter = answersExcelExporter;
            _countyEmailDistribution = countyEmailDistribution;
        }

        public async Task Process()
        {
            _logger.LogInformation($"{DateTimeOffset.Now}: Sending assessment results notification.");
            var formsForThePastDay = await _formService.GetFormsByTime(TimeSpan.FromDays(1));
            var formsByCounty = formsForThePastDay.GroupBy(f => f.UserInfo.County);
            var tasks = new List<Task>();
            foreach (var forms in formsByCounty)
            {
                tasks.Add(SendEmailsForCounty(forms));
            }
            //we should check if there's a rate limit for the SendGrid service, or maybe we should add a delay for SMTP sender
            await Task.WhenAll(tasks); 
        }

        private async Task SendEmailsForCounty(IGrouping<string, FormInfo> forms)
        {
            var jArray =
                JArray.FromObject(forms.Select(c => JsonConvert.DeserializeObject<dynamic>(c.Content).RootElement).ToList());
            var excelFile = _answersExcelExporter.AnswersToExcel(jArray);
            var countyDistribution = _countyEmailDistribution.CountyDistributions
                .FirstOrDefault(c => c.County == forms.Key);
            if (countyDistribution == null)
                return;
            await SendEmailToContacts(countyDistribution, excelFile, forms);
        }

        private async Task SendEmailToContacts(CountyDistribution countyDistribution, byte[] answers,
            IGrouping<string, FormInfo> countyForms)
        {
            foreach (var contact in countyDistribution.EmailList)
            {
                var email = new Email
                {
                    Content = "Hello! These are today's forms.", //to be replaced with the HTML template
                    FromEmail = _countyEmailDistribution.Sender,
                    FromName = _countyEmailDistribution.SenderName,
                    Subject = $"{countyForms.Key}-{DateTime.Now:yyyyMMdd}",
                    To = contact
                };
                email.Attachment = new EmailAttachment($"{countyForms.Key}-{DateTime.Now:yyyyMMdd}.xlsx", answers);
                await _emailSender.SendAsync(email, CancellationToken.None);
            }
        }
    }
}
