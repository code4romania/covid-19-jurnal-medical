using AutoMapper;
using StamAcasa.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StamAcasa.Common.Services
{
    public class AssessmentHistoryService : IAssessmentHistoryService
    {
        private readonly UserDbContext _context;
        private readonly IMapper _mapper;

        public AssessmentHistoryService(UserDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        
        public async Task<bool> AddAssessmentHistoryEntry(AssessmentHistory entry)
        {
            var user = _context.Users.FirstOrDefault(u => u.Sub == entry.Sub);

            if (user == null)
                throw new ArgumentException("There is no user associated with this assessment enrty!");

            entry.User = user;

            _context.Add(entry);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
}
