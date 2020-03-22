using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services {
    public interface IUserService
    {
        Task<bool> AddOrUpdateUserInfo(UserModel user);
        Task<bool> AddDependentInfo(UserModel user, string parentSub);
        Task<UserInfo> GetUserInfo(string sub);
        Task<IEnumerable<UserInfo>> GetDependentInfo(string sub);
    }
}
