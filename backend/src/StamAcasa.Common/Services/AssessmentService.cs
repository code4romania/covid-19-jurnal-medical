using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services
{
    public class AssessmentService : IAssessmentService
    {
        private readonly UserDbContext _dbContext;
        private readonly IMapper _mapper;

        public AssessmentService(IUserService userService, UserDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<AssessmentDTO> GetAssessment(string userSub, int assessmentVersion)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Sub == userSub);

            return await GetAssessment(assessmentVersion, user);
        }

        private async Task<AssessmentDTO> GetAssessment(int assessmentVersion, User user)
        {
            var assessment = await _dbContext.Assessments.FirstOrDefaultAsync(a =>
                a.Version == assessmentVersion &&
                a.AssessmentType == GetAssessmentType(user));

            return _mapper.Map<AssessmentDTO>(assessment);
        }

        private AssessmentType GetAssessmentType(User userInfo)
        {
            if (userInfo == null)
                return AssessmentType.NewUser;

            var ageFilledIn = userInfo.Age != default;
            return ageFilledIn ? AssessmentType.UserWithProfileFilledIn : AssessmentType.NewUser;
        }
    }
}