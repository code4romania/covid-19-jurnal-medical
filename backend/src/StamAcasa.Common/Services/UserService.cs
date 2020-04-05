﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services
{
    public class UserService : IUserService {
        private readonly UserDbContext _context;
        private readonly IMapper _mapper;

        public UserService(UserDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private async Task<User> AddOrUpdateEntity(User user, object profileUpdateInfo)
        {
            if (user == null) {
                var newUserInfo = _mapper.Map<User>(profileUpdateInfo);
                var saved = await _context.Users.AddAsync(newUserInfo);
                await _context.SaveChangesAsync();
                return saved.Entity;
            }

            var contextEntry = _context.Entry<User>(user);
            contextEntry.CurrentValues.SetValues(profileUpdateInfo);
            _context.Users.Update(user);
            var result = await _context.SaveChangesAsync();
            return result > 0 ? user : null;
        }

        public async Task<UserInfo> AddOrUpdateUserInfo(UserProfileDTO userUpdateInfo)
        {
            var user = _context.Users.FirstOrDefault(u => u.Sub == userUpdateInfo.Sub);
            var profile = await AddOrUpdateEntity(user, userUpdateInfo);
            return _mapper.Map<UserInfo>(profile);
        }

        public async Task<UserInfo> AddOrUpdateDependentInfo(UserProfileDTO dependentInfo, string parentSub)
        {
            var parentUser = _context.Users.FirstOrDefault(u => u.Sub == parentSub);
            if (parentUser == null)
                return null;

            dependentInfo.ParentId = parentUser.Id;
            User existingUserEntity = null;
            if(dependentInfo.Id > 0) 
                existingUserEntity = _context.Users.FirstOrDefault(u => u.Id == dependentInfo.Id);

            var profile = await AddOrUpdateEntity(existingUserEntity, dependentInfo);
            return _mapper.Map<UserInfo>(profile);
        }

        public async Task<UserInfo> GetUserInfo(string sub)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Sub == sub);
            var result = _mapper.Map<UserInfo>(user);
            return result;
        }
        public async Task<UserInfo> GetUserInfo(int id) {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
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

        public async Task<IEnumerable<UserInfo>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            var result = users.Select(_mapper.Map<UserInfo>);
            return result;
        }
    }
}
