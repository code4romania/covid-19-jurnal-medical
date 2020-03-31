﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StamAcasa.Common.DTO;
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
        /// Saves user profile for current(authenticated) user or for people in his care.
        /// The dependent flag is used to distinguish between the current user profile and person in his care.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Produces(typeof(bool))]
        public async Task<IActionResult> SaveUserInfo(UserModel model)
        {
            if(!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState.Values);
            var sub = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if(sub == null)
                return new UnauthorizedResult();
            var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;

            bool result;
            if (!model.IsDependent)
            {
                model.Sub = sub;
                model.Email = email;
                result = await _userService.AddOrUpdateUserInfo(model);
            }
            else
            {
                if (model.Id.HasValue)
                {
                    var currentUser = await _userService.GetUserInfo(sub);
                    var person = await _userService.GetUserInfo(model.Id.Value);
                    if (person.ParentId.HasValue && person.ParentId != currentUser.Id)
                    {
                        return new StatusCodeResult(StatusCodes.Status403Forbidden);
                    }
                }

                result = await _userService.AddOrUpdateDependentInfo(model, sub);
            }

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