using System.Threading;
using System.Threading.Tasks;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services.Emailing
{
    public interface IEmailSender
    {
        Task SendAsync(Email email, CancellationToken cancellationToken);
    }
}
