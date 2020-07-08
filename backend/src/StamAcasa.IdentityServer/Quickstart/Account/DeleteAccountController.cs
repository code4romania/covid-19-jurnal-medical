using System;
using System.Threading.Tasks;
using IdentityServer.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace StamAcasa.IdentityServer.Quickstart.Account
{
    [ApiController]
    [AllowAnonymous]
    public class DeleteAccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public DeleteAccountController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        [Route("/api/delete")]
        [HttpPost]
        public async Task<IActionResult> DeleteAccountAsync([FromBody] DeleteAccountModel model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Problem("Incorrect password");
            }


            var result = await _userManager.DeleteAsync(user);
            var userId = await _userManager.GetUserIdAsync(user);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Unexpected error occurred deleting user with ID '{userId}'.");
            }

            //await _signInManager.SignOutAsync();


            return Ok();
        }
    }
}