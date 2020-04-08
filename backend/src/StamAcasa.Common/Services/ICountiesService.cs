using System.Collections.Generic;
using System.Threading.Tasks;
using StamAcasa.Common.DTO;

namespace StamAcasa.Common.Services
{
    public interface ICountiesService
    {
        Task<List<County>> GetAllCounties();
        Task<List<City>> GetCitiesByCountyId(int countyId);
    }
}
