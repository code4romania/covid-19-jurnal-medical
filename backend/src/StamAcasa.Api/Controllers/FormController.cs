using System;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StamAcasa.Api.Models;
using StamAcasa.Api.Services;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Services;

namespace StamAcasa.Api.Controllers
{
    [Authorize(AuthenticationSchemes = "answersApi")]
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : BaseApiController
    {
        private readonly IFileService _fileService;
        private readonly IFormService _formService;
        private readonly IAssessmentService _assessmentService;

        public FormController(IFileService fileService, IFormService formService, IUserService userService, IAssessmentService assessmentService) : base(userService)
        {
            _fileService = fileService;
            _formService = formService;
            _assessmentService = assessmentService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int? id = null)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (string.IsNullOrEmpty(subClaimValue))
                return new UnauthorizedResult();

            if (await IsRequestInvalid(subClaimValue, id))
            {
                return new UnauthorizedResult();
            }

            var result =
              id.HasValue ?
                  await _formService.GetForms(id.Value) :
                  await _formService.GetForms(subClaimValue);

            return new OkObjectResult(result);
        }

        [HttpGet("version")]
        public async Task<IActionResult> GetVersion([FromQuery(Name = "userId")] int? userId)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

            if (string.IsNullOrEmpty(subClaimValue))
                return new UnauthorizedResult();

            if (await IsRequestInvalid(subClaimValue, userId))
            {
                return new UnauthorizedResult();
            }

            var assessment = await _assessmentService.GetAssessment(subClaimValue, userId);

            return new OkObjectResult(assessment);
        }

        [HttpPost]
        public async Task<IActionResult> PostAnswer([FromBody]UserForm form, [FromQuery]int? id = null)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (string.IsNullOrEmpty(subClaimValue))
                return new UnauthorizedResult();

            if (await IsRequestInvalid(subClaimValue, id))
            {
                return new UnauthorizedResult();
            }

            var authenticatedUser = await UserService.GetUserInfoBySub(subClaimValue);

            // TODO: add user profile info as added properties to form, before save

            var contentToSave = JsonConvert.SerializeObject(form);

            await _formService.AddForm(new FormInfo
            {
                Content = contentToSave,
                Timestamp = form.Timestamp.ToDateTimeFromEpoch(),
                UserId = id ?? authenticatedUser.Id,
                FormTypeId = form.FormId.ToString()
            });

            await _fileService.SaveRawData(contentToSave,
                $"{Guid.Parse(subClaimValue):N}_{form.FormId}_{form.Timestamp}.json");

            return new OkObjectResult(string.Empty);
        }
    }
}