using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services
{
    public class FormService : IFormService
    {
        private readonly IMapper _mapper;
        private readonly UserDbContext _context;

        public FormService(IMapper mapper, UserDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<FormInfo>> GetForms(int userId)
        {
            var result = await _context
                .Forms.Include("User")
                .Where(f => f.User.Id == userId)
                .Select(f => _mapper.Map<FormInfo>(f))
                .ToListAsync();

            return result;
        }

        public async Task<IEnumerable<FormInfo>> GetForms(string userSub)
        {
            var result = await _context
                .Forms.Include("User")
                .Where(f => f.User.Sub == userSub)
                .Select(f => _mapper.Map<FormInfo>(f))
                .ToListAsync();

            return result;
        }

        public async Task<bool> AddForm(FormInfo formModel)
        {
            var formEntity = new Form
            {
                Content = formModel.Content,
                FormTypeId = formModel.FormTypeId,
                Timestamp = formModel.Timestamp,
                UserId = formModel.UserId
            };

            var result = await _context.Forms.AddAsync(formEntity);
            await _context.SaveChangesAsync();
            return (result.Entity?.Id ?? 0) > 0;
        }

        public async Task<IEnumerable<FormInfo>> GetFormsByTime(TimeSpan timeSpan)
        {
            //probably we should move the hour to appSettings.json
            //and handle dates correctly
            //some users might be from outside the country, and the server might not use Romanian time even if it's hosted here
            var collectionTime = DateTime.Today.AddHours(20);
            var result = await _context
                .Forms.Include(x => x.User)
                .Where(f => collectionTime.Subtract(timeSpan) < f.Timestamp)
                .Select(f => _mapper.Map<FormInfo>(f))
                .ToListAsync();

            return result;
        }
    }
}
