using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityServer.Data;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace StamAcasa.IdentityServer.Quickstart.Account
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DeleteAccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public DeleteAccountController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAccountAsync([FromBody] DeleteAccountModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return new UnauthorizedResult();
            }

            var response = await _userManager.DeleteAsync(user);
            if (!response.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Unexpected error occurred deleting user with ID '{user.Id}'.");
            }

            return Ok();
        }
    }
}