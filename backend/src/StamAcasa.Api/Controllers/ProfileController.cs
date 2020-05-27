using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Services;

namespace StamAcasa.Api.Controllers
{
    [Authorize(AuthenticationSchemes = "usersApi")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserService _userService;

        public ProfileController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Gets profile information for a given user.
        /// If no id is passed, then the current(authenticated) user info is returned.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Produces(typeof(UserInfo))]
        public async Task<IActionResult> GetUserInfo(int? id = null)
        {
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var result =
                !id.HasValue ?
                    await _userService.GetUserInfo(sub) :
                    await _userService.GetUserInfo(id.Value);
            return new OkObjectResult(result);
        }

        /// <summary>
        /// Gets a list of all family members.
        /// </summary>
        /// <returns></returns>
        [HttpGet("family")]
        [Produces(typeof(IEnumerable<UserInfo>))]
        public async Task<IActionResult> GetFamilyMembers()
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var result = await _userService.GetDependentInfo(sub);
            return new OkObjectResult(result);
        }


        /// <summary>
        /// Saves user profile for the current(authenticated) user.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Produces(typeof(bool))]
        public async Task<IActionResult> SaveCurrentProfile(UserProfileDTO model)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();
            var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;

            model.Sub = sub;
            model.Email = email;
            var result = await _userService.AddOrUpdateUserInfo(model);

            return new OkObjectResult(result);
        }


        /// <summary>
        /// Adds a family member profile.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Id of newly created entity.</returns>
        [HttpPost("family")]
        [Produces(typeof(int))]
        public async Task<IActionResult> AddFamilyProfile(UserProfileDTO model)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var result = await _userService.AddOrUpdateDependentInfo(model, sub);
            if (result == null)
            {
                return NotFound($"Could not find parent user sub = {sub}");
            }
            return new OkObjectResult(result.Id);
        }

        /// <summary>
        /// Updates a profile.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <param name="model">User profile.</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Produces(typeof(bool))]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UserProfileDTO model)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var currentUser = await _userService.GetUserInfo(sub);
            if (id != currentUser.Id)
            {
                return new StatusCodeResult(StatusCodes.Status403Forbidden);
            }

            model.Sub = sub;
            model.Id = id;
            var result = await _userService.AddOrUpdateUserInfo(model);

            return new OkObjectResult(result != null);
        }

        /// <summary>
        /// Updates a family member profile.
        /// </summary>
        /// <param name="id">Family member id.</param>
        /// <param name="model">Family member profile.</param>
        /// <returns></returns>
        [HttpPut("family/{id}")]
        [Produces(typeof(bool))]
        public async Task<IActionResult> UpdateFamilyProfile(int id, [FromBody] UserProfileDTO model)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var currentUser = await _userService.GetUserInfo(sub);
            var person = await _userService.GetUserInfo(id);
            if (person.ParentId.HasValue && person.ParentId != currentUser.Id)
            {
                return new StatusCodeResult(StatusCodes.Status403Forbidden);
            }

            model.Id = id;
            var result = await _userService.AddOrUpdateDependentInfo(model, sub);

            return new OkObjectResult(result != null);
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