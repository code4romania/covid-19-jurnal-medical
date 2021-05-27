using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StamAcasa.Api.Controllers;

namespace StamAcasa.Api.Tests
{
    public class ControllerBaseTest<T> where T : BaseApiController
    {
        public T _sut { get; set; }


        public ControllerBaseTest()
        {
        }

        public static ClaimsPrincipal GetClaimsPrincipal(Claim[] claims = null)
        {
            var defaultClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, "I am a test user")
            };

            if (claims != null)
            {
                defaultClaims.AddRange(claims);
            }

            return new ClaimsPrincipal(new ClaimsIdentity(defaultClaims, "mock"));
        }

        public void SetUserInControllerContext(ClaimsPrincipal user)
        {
            _sut.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
        }
    }
}