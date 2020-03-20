// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StamAcasa.Api.Common;
using StamAcasa.Api.Models;
using StamAcasa.Api.Services;

namespace Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _environment = environment;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public List<ApiAuthenticationScheme> AuthSchemes { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            var identityUrl = Configuration.GetValue<string>("IdentityServerUrl");
            var apiSchemes = new List<ApiAuthenticationScheme>(); 
            Configuration.GetSection("ApiConfiguration").Bind(apiSchemes);
            var serviceBuilder = services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);
            foreach (var authScheme in apiSchemes) {
                serviceBuilder = serviceBuilder.AddIdentityServerAuthentication(authScheme.ApiName, options => {
                    options.Authority = identityUrl;
                    options.ApiName = authScheme.ApiName;
                    options.ApiSecret = authScheme.ApiSecret;
                    options.RequireHttpsMetadata = !_environment.IsDevelopment();
                });
            }

            var corsUrls = new List<string>();
            Configuration.GetSection("AllowedCorsOrigins").Bind(corsUrls);
            services.AddCors(options =>
            {
                // this defines a CORS policy called "default"
                options.AddPolicy("default", policy =>
                {
                    policy = corsUrls
                        .Aggregate(policy, (current, url) => current.WithOrigins(url));

                    policy.AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            switch (Configuration.GetValue<StorageTypes>("StorageType")) {
                case StorageTypes.FileSystem:
                    services.AddSingleton<IFileService, LocalFileService>();
                    break;
            }
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();

            app.UseCors("default");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}