using StamAcasa.Common.EmailService;

namespace StamAcasa.EmailService.EmailBuilder
{
    public interface ITemplateFileSelector
    {
        string GetTemplatePath(EmailTemplate template);
    }
}
