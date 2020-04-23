using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.Common.Services.Excel;

namespace StamAcasa.Common.Notifications
{
    public class ResultNotificationsDispatch : INotificationsDispatch
    {
        private readonly ILogger<ResultNotificationsDispatch> _logger;
        private readonly IFormService _formService;
        private readonly IQueueService _queueService;
        private readonly IAnswersExcelExporter _answersExcelExporter;
        private readonly CountyEmailDistribution _countyEmailDistribution;

        public ResultNotificationsDispatch(ILogger<ResultNotificationsDispatch> logger,
            IFormService formService,
            IQueueService queueService,
            IAnswersExcelExporter answersExcelExporter,
            CountyEmailDistribution countyEmailDistribution
        )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _formService = formService;
            _queueService = queueService;
            _answersExcelExporter = answersExcelExporter;
            _countyEmailDistribution = countyEmailDistribution;
        }

        public async Task Process()
        {
            _logger.LogInformation($"{DateTimeOffset.Now}: Sending assessment results notification.");
            var formsForThePastDay = await _formService.GetFormsByTime(TimeSpan.FromDays(1));
            var formsByCounty = formsForThePastDay.GroupBy(f => f.UserInfo.County);

            var tasks = new List<Task>
            {
                SendEmailsForList(formsForThePastDay, CreateAllCountiesEmailData())
            };
            foreach (var forms in formsByCounty)
            {
                tasks.Add(SendEmailsForList(forms, CreateCountyEmailData(forms.Key)));
            }

            //we should check if there's a rate limit for the SendGrid service, or maybe we should add a delay for SMTP sender
            await Task.WhenAll(tasks);
        }

        private async Task SendEmailsForList(IEnumerable<FormInfo> forms, ResultsNotificationEmailData emailData)
        {
            if (emailData.EmailList == null || !emailData.EmailList.Any())
                return;
            var jArray =
                JArray.FromObject(forms.Select(c =>
                {
                    var deserializedFormContent = JsonConvert.DeserializeObject<dynamic>(c.Content);

                    dynamic formInfo = new ExpandoObject();
                    formInfo.Name = c.UserInfo.Name;
                    formInfo.City = c.UserInfo.City;
                    formInfo.County = c.UserInfo.County;
                    formInfo.PhoneNumber = c.UserInfo.PhoneNumber;
                    formInfo.Comorbidities = string.Join(",", c.UserInfo.PreexistingMedicalCondition);
                    formInfo.answers = deserializedFormContent.RootElement.answers;
                    formInfo.formId = deserializedFormContent.RootElement.formId;
                    return formInfo;
                }).ToList());
            var excelFile = _answersExcelExporter.AnswersToExcel(jArray);

            await SendEmailToContacts(excelFile, emailData);
        }

        private async Task SendEmailToContacts(byte[] answers, ResultsNotificationEmailData emailData)
        {
            foreach (var contact in emailData.EmailList)
            {
                var email = new EmailRequestModel
                {
                    TemplateType = EmailTemplate.StateEntity,
                    Type = "dailyReportTemplate",
                    Address = contact,
                    Subject = emailData.FileName,
                    SenderName = _countyEmailDistribution.SenderName,
                    PlaceholderContent = new Dictionary<string, string>
                    {
                        { "location", emailData.Location }
                    }
                };
                email.Attachment = new EmailAttachment($"{emailData.FileName}.xlsx", answers);
                await _queueService.PublishEmailRequest(email);
            }
        }

        private ResultsNotificationEmailData CreateCountyEmailData(string county)
        {
            var countyDistribution = _countyEmailDistribution.CountyDistributions
                                .FirstOrDefault(c => c.County == county);
            if (countyDistribution == null)
            {
                _logger.LogWarning("Could not find CountyDistributions for county = {0}", county);
                return  new ResultsNotificationEmailData();
            }

            var countyEmailData = new ResultsNotificationEmailData
            {
                EmailList = countyDistribution.EmailList,
                FileName = $"{county}-{DateTime.Now:yyyyMMdd}",
                Location = $"judetul {county}"
            };

            return countyEmailData;
        }

        private ResultsNotificationEmailData CreateAllCountiesEmailData()
        {
            return new ResultsNotificationEmailData
            {
                EmailList = _countyEmailDistribution.AllEmailAddresses,
                FileName = $"{DateTime.Now:yyyyMMdd}",
                Location = "toate judetele"
            };
        }
    }
}
