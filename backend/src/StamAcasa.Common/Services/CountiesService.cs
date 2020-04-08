using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.Models;

namespace StamAcasa.Common.Services
{
    public class CountiesService : ICountiesService
    {
        private readonly CountiesDbContext _countiesDbContext;
        private readonly IMapper _mapper;

        public CountiesService(CountiesDbContext countiesDbContext, IMapper mapper)
        {
            _countiesDbContext = countiesDbContext;
            _mapper = mapper;
        }

        public async Task<List<DTO.County>> GetAllCounties()
        {
            var counties = await _countiesDbContext.Counties.ToListAsync();

            return _mapper.Map<List<DTO.County>>(counties);
        }

        public async Task<List<DTO.City>> GetCitiesByCountyId(int countyId)
        {
            var county = await _countiesDbContext.Counties.FirstOrDefaultAsync(c => c.Id == countyId);

            var cities = await _countiesDbContext.Cities.Where(x => x.CountyId == county.Id).ToListAsync();

            return _mapper.Map<List<DTO.City>>(cities);
        }
    }
}
