using System.Threading;
using System.Threading.Tasks;

namespace StamAcasa.JobScheduler.Jobs
{
    internal interface IScheduledJob
    {
        Task RunAsync(CancellationToken cancellationToken);
    }
}
