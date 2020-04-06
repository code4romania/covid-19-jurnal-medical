using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.DTO;

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
            var formEntity = _mapper.Map<Form>(formModel);
            var result = await _context.Forms.AddAsync(formEntity);
            await _context.SaveChangesAsync();
            return (result.Entity?.Id ?? 0) > 0;
        }
    }
}
