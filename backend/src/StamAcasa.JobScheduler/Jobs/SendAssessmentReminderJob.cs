using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.Notifications;

namespace StamAcasa.JobScheduler.Jobs
{
    internal class SendAssessmentReminderJob : IScheduledJob
    {
        private readonly ILogger<SendAssessmentReminderJob> _logger;
        private readonly AssessmentNotificationsDispatch _notificationsDispatch;

        public SendAssessmentReminderJob(
            ILogger<SendAssessmentReminderJob> logger,
            AssessmentNotificationsDispatch notificationsDispatch)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _notificationsDispatch = notificationsDispatch
                                     ?? throw new ArgumentNullException(nameof(notificationsDispatch));
        }

        public async Task RunAsync(CancellationToken cancellationToken)
        {
            try
            {
                await _notificationsDispatch.Process().ConfigureAwait(false);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error when dispatching assessment reminder notification: {exception.Message}.");
            }
        }
    }
}
