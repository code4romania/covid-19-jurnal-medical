using System;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StamAcasa.Api.Services;
using StamAcasa.Common.DTO;
using StamAcasa.Common.Services;

namespace StamAcasa.Api.Controllers
{
    [Authorize(AuthenticationSchemes = "answersApi")]
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IFormService _formService;
        private readonly IUserService _userService;
        private readonly IAssessmentService _assessmentService;

        public FormController(IFileService fileService, IFormService formService, IUserService userService, IAssessmentService assessmentService)
        {
            _fileService = fileService;
            _formService = formService;
            _userService = userService;
            _assessmentService = assessmentService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int? id = null)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (subClaimValue == null)
                return new UnauthorizedResult();

            var result =
                id == null ?
                    await _formService.GetForms(subClaimValue) :
                    await _formService.GetForms(id.Value);
            return new OkObjectResult(result);
        }


        [HttpGet("version")]
        public async Task<IActionResult> GetVersion()
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (subClaimValue == null)
                return new UnauthorizedResult();

            var assessment = await _assessmentService.GetAssessment(subClaimValue);

            return new OkObjectResult(assessment);
        }

        [HttpPost]
        public async Task<IActionResult> PostAnswer([FromBody]object content, [FromQuery]int? id = null)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (subClaimValue == null)
                return new UnauthorizedResult();

            var form = JsonConvert.DeserializeObject<dynamic>(content.ToString());
            if (form.formId == null)
                return new BadRequestResult();

            var timestamp = DateTime.Now;
            form.Add("Timestamp", timestamp);

            var authenticatedUser = await _userService.GetUserInfo(subClaimValue);
            if (authenticatedUser == null)
            {
                return NotFound("Could not find authenticated user");
            }
            if (id.HasValue)
            {
                var currentUser = await _userService.GetUserInfo(id.Value);
                if (currentUser == null)
                {
                    return NotFound($"Could not find user with id {id.Value}");
                }

                if (currentUser.ParentId.HasValue && currentUser.ParentId != authenticatedUser.Id)
                    return new ForbidResult();
            }

            form.Add("UserId", id ?? authenticatedUser.Id);
            // TODO: add user profile info as added properties to form, before save

            var contentToSave = JsonConvert.SerializeObject(form).ToString();

            await _formService.AddForm(new FormInfo
            {
                Content = contentToSave,
                Timestamp = timestamp,
                UserId = id ?? authenticatedUser.Id,
                FormTypeId = form.formId.ToString()
            });

            await _fileService.SaveRawData(contentToSave,
                $"{Guid.Parse(subClaimValue).ToString("N")}_{form.formId}_{timestamp.ToEpochTime()}.json");

            return new OkObjectResult(string.Empty);
        }
    }
}