using StamAcasa.Common.Services.Emailing;

namespace StamAcasa.EmailService.EmailBuilder
{
    public interface ITemplateFileSelector
    {
        string GetTemplatePath(EmailTemplate template);
    }
}
