using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace StamAcasa.Common.Services.Assessment
{
    public class StaticFileAssessmentFormProvider : IAssessmentFormProvider
    {
        private readonly ILogger<StaticFileAssessmentFormProvider> _logger;
        private readonly string _formNewUserFile;
        private readonly string _formFollowUpFile;
        public StaticFileAssessmentFormProvider(ILogger<StaticFileAssessmentFormProvider> logger)
        {
            _logger = logger;

            var currentDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            _formNewUserFile = Path.Combine(currentDirectory, "Resources", "formNewUser.json");
            _formFollowUpFile = Path.Combine(currentDirectory, "Resources", "formFollowUp.json");
        }

        public async Task<string> GetFormNewUser()
        {
            await Task.FromResult(0);

            try
            {
                return LoadText(_formNewUserFile);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Unable to read file {_formNewUserFile}");
                return string.Empty;
            }
        }

        public async Task<string> GetFormFollowUp()
        {
            await Task.FromResult(0);

            try
            {
                return LoadText(_formFollowUpFile);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Unable to read file {_formFollowUpFile}");

                return string.Empty;
            }
        }


        private static string LoadText(string filename)
        {
            return string.Join(" ", File.ReadAllLines(filename));
        }

    }
}
