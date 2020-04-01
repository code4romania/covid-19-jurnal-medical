using System.Threading;
using System.Threading.Tasks;

namespace StamAcasa.JobScheduler
{
    internal interface IScheduledJob<TJob>
        where TJob : IScheduledJob<TJob>
    {
        Task ExecuteAsync();
    }

    internal interface IScheduledJob
    {
        Task ExecuteAsync(CancellationToken cancellationToken);
    }
}
