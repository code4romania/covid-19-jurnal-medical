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
    [Route("api/[controller]/{version}")]
    [ApiController]
    public class AssessmentController : ControllerBase
    {
        private readonly IAssessmentService _assessmentService;
      
        public AssessmentController(IAssessmentService assessmentService)
        {
            _assessmentService = assessmentService;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get(int version = 1)
        {
            var subClaimValue = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if(subClaimValue==null)
                return new UnauthorizedResult();

            var assessment = await _assessmentService.GetAssessment(subClaimValue, version);
            
            return new OkObjectResult(assessment);
        }
    }
}