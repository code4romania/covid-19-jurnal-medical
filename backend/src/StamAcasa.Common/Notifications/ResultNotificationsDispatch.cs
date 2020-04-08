using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace StamAcasa.Common.Notifications
{
    public class ResultNotificationsDispatch : INotificationsDispatch
    {
        private readonly ILogger<ResultNotificationsDispatch> _logger;

        public ResultNotificationsDispatch(ILogger<ResultNotificationsDispatch> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task Process()
        {
            // TODO: Implement actual logic.
            _logger.LogInformation($"{DateTimeOffset.Now}: Sending assessment results notification.");
            return Task.CompletedTask;
        }
    }
}
