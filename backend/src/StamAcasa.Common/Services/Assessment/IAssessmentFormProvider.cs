using System.Threading.Tasks;

namespace StamAcasa.Common.Services.Assessment
{
    public interface IAssessmentFormProvider
    {
        Task<string> GetFormNewUser();
        Task<string> GetFormFollowUp();
    }
}
