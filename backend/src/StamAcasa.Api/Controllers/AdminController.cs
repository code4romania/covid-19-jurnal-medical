using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StamAcasa.Api.Controllers
{
    [Authorize(AuthenticationSchemes = "answersApi", Roles = "Admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        [HttpGet]
        public IActionResult Get()
        {
            return Content("Yes you are admin");
        }
    }
}