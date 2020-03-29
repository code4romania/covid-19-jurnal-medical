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

        public FormController(IFileService fileService, IFormService formService, IUserService userService)
        {
            _fileService = fileService;
            _formService = formService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int? id = null)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if(subClaimValue==null)
                return new UnauthorizedResult();

            var result = 
                id == null ? 
                    await _formService.GetForms(subClaimValue) : 
                    await _formService.GetForms(id.Value);
            return new OkObjectResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostAnswer([FromBody]object content, [FromQuery]int? id=null)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (subClaimValue == null)
                return new UnauthorizedResult();

            var form = JsonConvert.DeserializeObject<dynamic>(content.ToString());
            if (form.doc_id == null)
                return new BadRequestResult();

            var timestamp = DateTime.Now;
            form.Add("Timestamp", timestamp);

            var authenticatedUser = await _userService.GetUserInfo(subClaimValue);
            
            if (id.HasValue)
            {
                var currentUser = await _userService.GetUserInfo(id.Value);
                if(currentUser.ParentId.HasValue && currentUser.ParentId!=authenticatedUser.Id)
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
                FormTypeId = form.doc_id.ToString()
            });

            await _fileService.SaveRawData(contentToSave, 
                $"{Guid.Parse(subClaimValue).ToString("N")}_{form.doc_id}_{timestamp.ToEpochTime()}.json");

            return new OkObjectResult(string.Empty);
        }

    }
}