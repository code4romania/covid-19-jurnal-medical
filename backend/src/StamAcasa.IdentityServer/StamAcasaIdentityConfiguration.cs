using System.Collections.Generic;
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
        private readonly List<Client> _clients = new List<Client>();

        public StamAcasaIdentityConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
            configuration.GetSection("ClientApplications").Bind(_clients);
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

        public IEnumerable<Client> Clients => _clients;
    }
}