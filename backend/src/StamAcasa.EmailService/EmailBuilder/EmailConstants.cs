﻿using StamAcasa.Common.Services.Emailing;
using System;
using System.Collections.Generic;
using System.Text;

namespace StamAcasa.EmailService.EmailBuilder
{
    public static class EmailConstants
    {
        public static string GetSubject(EmailTemplate template)
        {
            return subjects[template];
        }

        public static string GetTemplatePath(EmailTemplate template)
        {
            return templatePaths[template];
        }

        private static Dictionary<EmailTemplate, string> subjects = new Dictionary<EmailTemplate, string>()
        {
            { EmailTemplate.AccountConfirmation, "Account confirmation subject"},
            { EmailTemplate.DailyAssessment, "Daily assessment subject"},
            { EmailTemplate.StateEntity, "State entity subject"}
        };

        private static Dictionary<EmailTemplate, string> templatePaths = new Dictionary<EmailTemplate, string>()
        {
            { EmailTemplate.AccountConfirmation, "accountConfirmationTemplate.html"},
            { EmailTemplate.DailyAssessment, "dailyAssessmentTemplate.html"},
            { EmailTemplate.StateEntity, "stateEntityTemplate.html"}
        };
    }
}
