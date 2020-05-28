using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StamAcasa.Common.Services;

namespace StamAcasa.Api.Controllers
{
    [Route("api/profile")]
    [Authorize(AuthenticationSchemes = "adminApi")]
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    public class ProfileAdminController : ControllerBase
    {
        private readonly IUserService _userService;

        public ProfileAdminController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Delete user profile and related data.
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteProfile()
        {
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            await _userService.DeleteUserAndDependentData(sub);

            return Ok();
        }
    }
}