using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace StamAcasa.Api {
    public static class SwaggerExtension {
        public static IServiceCollection ConfigureSwagger(this IServiceCollection services, IConfiguration config) {
            var authorizeEndpoint = $"{config.GetValue<string>("IdentityServerUrl")}/connect/authorize";
            services.AddSwaggerGen(o => {
                o.SwaggerDoc("v1", new OpenApiInfo{  Title = "Narc Api Documentation", Version = "1" });
                o.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow {
                            AuthorizationUrl = new Uri(authorizeEndpoint),
                            Scopes = new Dictionary<string, string>
                            {
                                { "usersApi", "Access read operations" },
                                { "answersApi", "Access write operations" }
                            }
                        }
                    },
                    Description =
                        "JWT Authorization header using the Bearer scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.OAuth2,
                    Scheme = "Bearer"
                });
                o.OperationFilter<AuthorizeCheckOperationFilter>();
            });
            return services;
        }
    }
}
