using System.Threading.Tasks;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services.Emailing;

namespace StamAcasa.EmailService.EmailBuilder
{
    public interface IEmailBuilderService
    {
        Task<Email> BuildEmail(EmailRequestModel emailModel);
    }
}
