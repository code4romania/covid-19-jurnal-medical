using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StamAcasa.Common.Services;

namespace StamAcasa.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountyController : ControllerBase
    {
        private readonly ICountiesService _countiesService;

        public CountyController(ICountiesService countiesService)
        {
            _countiesService = countiesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if(subClaimValue == null)
                return new UnauthorizedResult();

            var result = await _countiesService.GetAllCounties();

            return new OkObjectResult(result);
        }

        [HttpGet("{countyId}/city")]
        public async Task<IActionResult> GetCitiesByCountyId(int countyId)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (subClaimValue == null)
                return new UnauthorizedResult();

            var result = await _countiesService.GetCitiesByCountyId(countyId);

            return Ok(result);
        }

    }
}
