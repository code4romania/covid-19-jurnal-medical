using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityServer.Data;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace StamAcasa.IdentityServer.Quickstart.Account
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DeleteAccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly DefaultTokenService _tokenService;
        private readonly IStamAcasaIdentityConfiguration _identityConfiguration;
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _apiUrl;
        private const string IdsrvClientId = "idsrvClient";

        public DeleteAccountController(UserManager<ApplicationUser> userManager, DefaultTokenService tokenService, IStamAcasaIdentityConfiguration identityConfiguration, IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _identityConfiguration = identityConfiguration;
            _clientFactory = clientFactory;
            _apiUrl = configuration["StamAcasaApi"];
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAccountAsync([FromBody] DeleteAccountModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return new UnauthorizedResult();
            }

            string tokenValue = await CreateAccessToken(user);
            var deleteResponse = await DeleteApiUserDataAsync(tokenValue);
            if (!deleteResponse.IsSuccessStatusCode)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Unexpected error occurred deleting user data" });
            }

            var response = await _userManager.DeleteAsync(user);
            if (!response.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Unexpected error occurred deleting user with ID '{user.Id}'.");
            }

            return Ok();
        }

        private async Task<HttpResponseMessage> DeleteApiUserDataAsync(string tokenValue)
        {
            var client = _clientFactory.CreateClient();

            var request = new HttpRequestMessage(HttpMethod.Delete,
           $"{_apiUrl}/api/Profile");
            request.Headers.Add("Authorization", $"Bearer {tokenValue}");

            return await client.SendAsync(request);
        }

        private async Task<string> CreateAccessToken(ApplicationUser user)
        {
            var IdentityUser = new IdentityServerUser(user.Id)
            {
                IdentityProvider = IdentityServerConstants.LocalIdentityProvider,
                AuthenticationTime = DateTime.UtcNow,
            };

            var request = new TokenCreationRequest
            {
                Subject = IdentityUser.CreatePrincipal(),
                IncludeAllIdentityClaims = true,
                Resources = new Resources(_identityConfiguration.Ids, _identityConfiguration.Apis())
            };

            request.ValidatedRequest = new ValidatedRequest
            {
                Subject = request.Subject
            };
            request.ValidatedRequest.SetClient(_identityConfiguration.Clients.FirstOrDefault(c => c.ClientId == IdsrvClientId));

            var accesToken = await _tokenService.CreateAccessTokenAsync(request);
            var token = await _tokenService.CreateSecurityTokenAsync(accesToken);
            return token;
        }
    }
}