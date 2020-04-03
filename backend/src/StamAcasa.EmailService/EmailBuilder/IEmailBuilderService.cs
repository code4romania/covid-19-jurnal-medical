using System.Threading.Tasks;
using StamAcasa.EmailService.EmailBuilder.Models;

namespace StamAcasa.EmailService.EmailBuilder
{
    public interface IEmailBuilderService
    {
        Task<EmailModel> BuildEmail(EmailRequestModel emailModel);
    }
}
