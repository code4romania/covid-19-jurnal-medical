using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using StamAcasa.IdentityServer.Models;

namespace StamAcasa.IdentityServer {
    public interface IStamAcasaIdentityConfiguration
    {
        IEnumerable<IdentityResource> Ids { get; }
        IEnumerable<Client> Clients { get; }
        IEnumerable<ApiResource> Apis();
    }

    public class StamAcasaIdentityConfiguration : IStamAcasaIdentityConfiguration
    {
        private readonly IConfiguration _configuration;

        public StamAcasaIdentityConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IEnumerable<IdentityResource> Ids =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
            };


        public IEnumerable<ApiResource> Apis() {
            var result = new List<ApiResource>();
            var apiSchemes = new List<ApiConfiguration>();
            _configuration.GetSection("ApiConfiguration").Bind(apiSchemes);
            foreach (var apiConfiguration in apiSchemes) {
                result.Add(new ApiResource(apiConfiguration.Name, apiConfiguration.ClaimList) {
                    ApiSecrets = new List<Secret> { new Secret(apiConfiguration.Secret.Sha256()) }
                });
            }
            return result;
        }

        public IEnumerable<Client> Clients =>
            new List<Client>
            {
                // JavaScript Client
                new Client
                {
                    ClientId = "js",
                    ClientName = "JavaScript Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RequirePkce = false,
                    RequireClientSecret = false,
                    RequireConsent = false,

                    RedirectUris =           { "https://localhost:5003/callback.html" },
                    PostLogoutRedirectUris = { "https://localhost:5003/index.html" },
                    AllowedCorsOrigins =     { "https://localhost:5003" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Email,
                        "answersApi","usersApi"
                    },
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenType = AccessTokenType.Reference
                }
            };
    }
}