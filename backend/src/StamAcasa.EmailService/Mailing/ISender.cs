using System.Threading;
using System.Threading.Tasks;
using StamAcasa.EmailService.EmailBuilder.Models;

namespace StamAcasa.EmailService.Mailing
{
    public interface ISender
    {
        Task SendAsync(EmailModel email, CancellationToken cancellationToken);
    }
}