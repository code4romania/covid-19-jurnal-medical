using System.Threading.Tasks;
using StamAcasa.Common.DTO;

namespace StamAcasa.Common.Services
{
    public interface IAssessmentService
    {
        Task<AssessmentDTO> GetAssessment(string userSub);
    }
}