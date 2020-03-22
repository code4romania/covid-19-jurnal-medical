using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
        public async Task<bool> AddUserInfo(UserModel user)
        {
            var newUserInfo = _mapper.Map<User>(user);
            var result = await _context.Users.AddAsync(newUserInfo);
            await _context.SaveChangesAsync();
            return result.Entity.Id > 0;
        }

        public async Task<bool> UpdateUserInfo(UserModel userUpdateInfo)
        {
            var user = _context.Users.FirstOrDefault(u => u.Sub == userUpdateInfo.Sub);
            foreach(var prop in typeof(UserModel).GetProperties())
                user.GetType().GetProperty(prop.Name).SetValue(user, prop.GetValue(userUpdateInfo));
            _context.Users.Update(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> AddDependentInfo(UserModel user, string parentSub)
        {
            throw new NotImplementedException();
        }
    }
}
