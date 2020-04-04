using System.Threading.Tasks;
using StamAcasa.Common.Models;

namespace StamAcasa.EmailService.EmailBuilder
{
    public interface IEmailBuilderService
    {
        Task<Email> BuildEmail(EmailRequestModel emailModel);
    }
}
