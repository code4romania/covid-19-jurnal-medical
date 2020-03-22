using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services {
    public interface IUserService
    {
        Task<bool> AddUserInfo(UserModel user);
        Task<bool> UpdateUserInfo(UserModel user);
        Task<bool> AddDependentInfo(UserModel user, string parentSub);

    }
}
