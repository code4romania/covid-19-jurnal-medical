using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StamAcasa.Common.Models;
using StamAcasa.Common.Services;

namespace StamAcasa.Api.Controllers
{
    [Authorize(AuthenticationSchemes = "usersApi")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Produces(typeof(UserInfo))]
        public async Task<IActionResult> GetUserInfo()
        {
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var result = await _userService.GetUserInfo(sub);
            return new OkObjectResult(result);
        }

        [HttpPost]
        [Produces(typeof(bool))]
        public async Task<IActionResult> SaveUserInfo(UserModel model)
        {
            if(!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if(sub == null)
                return new UnauthorizedResult();

            model.Sub = sub;
            var result = await _userService.AddOrUpdateUserInfo(model);
            return new OkObjectResult(result);
        }


        [HttpPost("dependent")]
        public async Task<IActionResult> SaveDependentInfo(UserModel model) {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var result = await _userService.AddDependentInfo(model, sub);
            return new OkObjectResult(result);
        }

        [HttpGet("dependent")]
        public async Task<IActionResult> GetDependentPeople() {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (sub == null)
                return new UnauthorizedResult();

            var result = await _userService.GetDependentInfo(sub);
            return new OkObjectResult(result);
        }
    }
}