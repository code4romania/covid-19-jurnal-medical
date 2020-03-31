using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services {
    public interface IUserService
    {
        Task<bool> AddOrUpdateUserInfo(UserModel user);
        Task<bool> AddOrUpdateDependentInfo(UserModel user, string parentSub);
        Task<UserInfo> GetUserInfo(string sub);
        Task<UserInfo> GetUserInfo(int id);
        Task<IEnumerable<UserInfo>> GetDependentInfo(string sub);
        Task<IEnumerable<UserInfo>> GetAll();
    }
}
