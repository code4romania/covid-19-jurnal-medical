using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using StamAcasa.Api;
using StamAcasa.Api.Common;
using StamAcasa.Api.Models;
using StamAcasa.Api.Services;
using StamAcasa.Api.Services.Excel;
using StamAcasa.Common;
using StamAcasa.Common.Services;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;
        private string _swaggerClientName;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _environment = environment;
            Configuration = configuration;
            _swaggerClientName = configuration.GetValue<string>("SwaggerOidcClientName");
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

            services.AddTransient<IExcelDocumentService, ExcelDocumentService>();
            services.AddTransient<IAnswersExcelExporter, AnswersExcelExporter>();

            services.AddAutoMapper(typeof(Startup), typeof(UserDbContext));
            services.AddDbContext<UserDbContext>(options=>
                options.UseSqlite(Configuration.GetConnectionString("UserDBConnection")));
            services.AddScoped<IFormService, FormService>();
            services.AddScoped<IUserService, UserService>();

            services.ConfigureSwagger(Configuration);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context => {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null) {
                        var errorResponse = JsonConvert.SerializeObject(new {
                            StatusCode = context.Response.StatusCode,
                            Message = $"Internal Server Error. {contextFeature.Error.Message}"
                        });
                        context.Response.ContentLength = errorResponse.Length;
                        await context.Response.WriteAsync(errorResponse, Encoding.UTF8);
                    }
                });
            });

            app.UseCors("default");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.OAuthClientId(_swaggerClientName);
                c.OAuthAppName("Swagger UI");
                c.ConfigObject = new ConfigObject {
                    Urls = new[]
                    {
                        new UrlDescriptor{Name = "api", Url = "/swagger/v1/swagger.json"} 
                    }
                };
               
            });
        }
    }
}