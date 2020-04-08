using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services.Assessment;

namespace StamAcasa.Common.Services
{
    public class AssessmentService : IAssessmentService
    {
        private readonly UserDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IAssessmentFormProvider _formProvider;

        public AssessmentService(IUserService userService, UserDbContext dbContext, IMapper mapper, IAssessmentFormProvider formProvider)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _formProvider = formProvider;
        }

        public async Task<AssessmentDTO> GetAssessment(string userSub)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Sub == userSub);

            var formNewUser = await _formProvider.GetFormNewUser();
            var formFollowUp = await _formProvider.GetFormFollowUp();
            return new AssessmentDTO
            {
                Content = UserIsNew(user) ? formNewUser : formFollowUp
            };
        }

        private bool UserIsNew(User userInfo)
        {
            if (userInfo == null)
                return true;

            return userInfo.Age != default;
        }
    }
}