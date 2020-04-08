using System;
using Cronos;

namespace StamAcasa.JobScheduler.Extensions
{
    internal static class CronExpressionExtensions
    {
        public static TimeSpan GetTimeSpanToNextOccurrence(this CronExpression cronExpression)
        {
            if (cronExpression is null)
            {
                throw new ArgumentNullException(nameof(cronExpression));
            }

            DateTimeOffset? next = cronExpression.GetNextOccurrence(DateTimeOffset.Now, TimeZoneInfo.Local);

            return next.HasValue
                ? next.Value - DateTimeOffset.Now
                : TimeSpan.Zero;
        }
    }
}
