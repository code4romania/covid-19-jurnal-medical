using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services
{
    public class UserService : IUserService
    {
        private readonly UserDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;

        public UserService(UserDbContext context, IMapper mapper, ILogger<UserService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        private async Task<User> AddOrUpdateEntity(User user, UserProfileDTO profileUpdateInfo)
        {
            var newUserInfo = _mapper.Map<User>(profileUpdateInfo);
            if (user == null)
            {
                var saved = await _context.Users.AddAsync(newUserInfo);
                await _context.SaveChangesAsync();
                return saved.Entity;
            }

            var contextEntry = _context.Entry<User>(user);
            contextEntry.CurrentValues.SetValues(newUserInfo);
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
            {
                _logger.LogInformation($"Parent user id not found for sub = {parentSub}");
                return null;
            }

            dependentInfo.ParentId = parentUser.Id;
            User existingUserEntity = null;
            if (dependentInfo.Id > 0)
                existingUserEntity = _context.Users.FirstOrDefault(u => u.Id == dependentInfo.Id);

            var profile = await AddOrUpdateEntity(existingUserEntity, dependentInfo);
            return _mapper.Map<UserInfo>(profile);
        }

        public async Task<UserInfo> GetUserInfo(string sub)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Sub == sub);
            var result = _mapper.Map<UserInfo>(user);
            return result;
        }
        public async Task<UserInfo> GetUserInfo(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            var result = _mapper.Map<UserInfo>(user);
            return result;
        }

        public async Task<IEnumerable<UserInfo>> GetDependentInfo(string sub)
        {
            var user = await _context.Users
                .Include("DependentUsers")
                .FirstOrDefaultAsync(u => u.Sub == sub);

            var result = user?.DependentUsers?.Select(d => _mapper.Map<UserInfo>(d)) ?? new UserInfo[0];
            return result;
        }

        public async Task<IEnumerable<UserInfo>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            var result = users.Select(_mapper.Map<UserInfo>);
            return result;
        }

        public async Task<IEnumerable<UserInfo>> GetAllParents()
        {
            var parents = new ConcurrentQueue<User>();
            await _context.Users.ForEachAsync(u =>
            {
                if (!u.ParentId.HasValue)
                    parents.Enqueue(u);
            });

            var result = parents.Select(_mapper.Map<UserInfo>);
            return result;
        }

        public async Task DeleteUserAndDependentData(string sub)
        {
            var user = await _context.Users
                .Include(u => u.DependentUsers)
                .FirstOrDefaultAsync(u => u.Sub == sub);
            if (user == null)
            {
                return;
            }

            var strategy = _context.Database.CreateExecutionStrategy();
            await strategy.ExecuteAsync(async () =>
            {
                using (var transaction = _context.Database.BeginTransaction())
                {
                    await DeleteUserAndForms(user);

                    foreach (var familyMember in user.DependentUsers)
                    {
                        await DeleteUserAndForms(familyMember);
                    }

                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
            });
        }

        private async Task DeleteUserAndForms(User user)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM \"Forms\" WHERE  \"UserId\" = {0}", new object[] { user.Id });
            _context.Remove(user);
        }
    }
}
