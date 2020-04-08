using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.Notifications;

namespace StamAcasa.JobScheduler.Jobs
{
    internal class SendResultsNotificationJob : IScheduledJob
    {
        private readonly ILogger<SendResultsNotificationJob> _logger;
        private readonly ResultNotificationsDispatch _notificationsDispatch;

        public SendResultsNotificationJob(
            ILogger<SendResultsNotificationJob> logger,
            ResultNotificationsDispatch notificationsDispatch)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _notificationsDispatch = notificationsDispatch
                                     ?? throw new ArgumentNullException(nameof(notificationsDispatch));
        }

        public async Task RunAsync(CancellationToken cancellationToken)
        {
            try
            {
                await _notificationsDispatch.Process();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error when dispatching results notification: {exception.Message}.");
            }
        }
    }
}
