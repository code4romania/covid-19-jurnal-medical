using System;
using System.Collections.Generic;
using System.Text;

namespace StamAcasa.EmailService.EmailBuilder
{
    public interface ITemplateFileSelector
    {
        string GetTemplatePath(Models.EmailTemplate template);
    }
}
