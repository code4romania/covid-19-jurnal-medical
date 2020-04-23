using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services.Assessment;

namespace StamAcasa.Common.Services
{
    public class AssessmentService : IAssessmentService
    {
        private readonly UserDbContext _dbContext;
        private readonly IAssessmentFormProvider _formProvider;

        public AssessmentService(UserDbContext dbContext, IAssessmentFormProvider formProvider)
        {
            _dbContext = dbContext;
            _formProvider = formProvider;
        }

        public async Task<AssessmentDTO> GetAssessment(string userSub)
        {
            var user = await _dbContext.Users
                .Include(x => x.Forms)
                .FirstOrDefaultAsync(u => u.Sub == userSub);

            if (UserIsNew(user) || HasNotCompletedAnyForm(user.Forms))
            {
                return new AssessmentDTO
                {
                    Content = await _formProvider.GetFormNewUser()
                };
            }

            return new AssessmentDTO
            {
                Content = await _formProvider.GetFormFollowUp()
            };
        }

        private bool HasNotCompletedAnyForm(HashSet<Form> userForms)
        {
            return userForms.Count == 0;
        }

        private bool UserIsNew(User userInfo)
        {
            if (userInfo == null)
                return true;

            return userInfo.Age == default;
        }
    }
}