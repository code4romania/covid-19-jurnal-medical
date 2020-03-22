using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StamAcasa.Api.Services;

namespace StamAcasa.Api.Controllers
{
    [Authorize(AuthenticationSchemes = "answersApi")]
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly IFileService _fileService;

        public AnswerController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sub = Guid.Parse(User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value).ToString("N");
            var result = await _fileService.GetForms(sub);
            return new OkObjectResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostAnswer()
        {
            var requestBody = await new StreamReader(Request.Body).ReadToEndAsync();
            var form = JsonConvert.DeserializeObject<dynamic>(requestBody);
            if (form.doc_id == null)
                return new BadRequestResult();

            var timestamp = DateTime.Now.ToEpochTime();
            form.Add("Timestamp", timestamp);
            var sub = Guid.Parse(User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value);
            form.Add("User", sub);

            var contentToSave = JsonConvert.SerializeObject(form).ToString();
            _fileService.SaveRawData(contentToSave, 
                $"{sub.ToString("N")}_{form.doc_id}_{timestamp}.json");

            return new OkObjectResult(string.Empty);
        }

    }
}