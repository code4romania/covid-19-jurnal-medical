using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services {
    public class UserService : IUserService {
        private readonly UserDbContext _context;
        private readonly IMapper _mapper;

        public UserService(UserDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> AddOrUpdateUserInfo(UserModel userUpdateInfo)
        {
            var user = _context.Users.FirstOrDefault(u => u.Sub == userUpdateInfo.Sub);
            if (user == null)
            {
                var newUserInfo = _mapper.Map<User>(user);
                var saved = await _context.Users.AddAsync(newUserInfo);
                await _context.SaveChangesAsync();
                return saved.Entity.Id > 0;
            }

            foreach(var prop in typeof(UserModel).GetProperties())
                user.GetType().GetProperty(prop.Name)?.SetValue(user, prop.GetValue(userUpdateInfo));
            _context.Users.Update(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> AddDependentInfo(UserModel dependentInfo, string parentSub)
        {
            var parentUser = _context.Users.FirstOrDefault(u => u.Sub == parentSub);
            if (parentUser == null)
                return false;
            var dependentInfoEntity = _mapper.Map<User>(dependentInfo);
            parentUser.DependentUsers.Add(dependentInfoEntity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserInfo> GetUserInfo(string sub)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Sub == sub);
            var result = _mapper.Map<UserInfo>(user);
            return result;
        }

        public async Task<IEnumerable<UserInfo>> GetDependentInfo(string sub)
        {
            var user = await _context.Users
                .Include("DependentUsers")
                .FirstOrDefaultAsync(u => u.Sub == sub);
            var result = user.DependentUsers.Select(d=>_mapper.Map<UserInfo>(d));
            return result;
        }
    }
}
