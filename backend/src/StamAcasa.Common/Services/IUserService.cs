using System.Collections.Generic;
using System.Threading.Tasks;
using StamAcasa.Common.DTO;

namespace StamAcasa.Common.Services
{
    public interface IUserService
    {
        Task<UserInfo> AddOrUpdateUserInfo(UserProfileDTO user);
        Task<UserInfo> AddOrUpdateDependentInfo(UserProfileDTO user, string parentSub);
        Task<UserInfo> GetUserInfoBySub(string sub);
        Task<UserInfo> GetUserInfoById(int id);
        Task<IEnumerable<UserInfo>> GetDependentInfo(string sub);
        Task<IEnumerable<UserInfo>> GetAll();
        Task<IEnumerable<UserInfo>> GetAllParents();
        Task<List<int>> GetFamilyMembersIds(string sub);
    }
}
