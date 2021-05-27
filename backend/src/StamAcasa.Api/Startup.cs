using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using EasyNetQ;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StamAcasa.Api.BackgroundServices;
using StamAcasa.Api.Extensions;
using StamAcasa.Api.Models;
using StamAcasa.Api.Services;
using StamAcasa.Common;
using StamAcasa.Common.Queue;
using StamAcasa.Common.Services;
using StamAcasa.Common.Services.Assessment;
using StamAcasa.Common.Services.Excel;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace StamAcasa.Api
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
            var identityUrl = Configuration.GetValue<string>("InternalIdentityServerUrl");
            var apiSchemes = new List<ApiAuthenticationScheme>();

            Configuration.GetSection("ApiConfiguration").Bind(apiSchemes);
            var serviceBuilder = services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);
            foreach (var authScheme in apiSchemes)
            {
                serviceBuilder = serviceBuilder.AddIdentityServerAuthentication(authScheme.ApiName, options =>
                {
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
            switch (Configuration.GetValue<StorageTypes>("StorageType"))
            {
                case StorageTypes.FileSystem:
                    services.AddSingleton<IFileService, LocalFileService>();
                    break;
            }

            services.AddTransient<IExcelDocumentService, ExcelDocumentService>();
            services.AddTransient<IAnswersExcelExporter, AnswersExcelExporter>();

            services.AddAutoMapper(typeof(Startup), typeof(UserDbContext));

            services.AddPostgreSqlDbContext(Configuration);

            services.AddScoped<IFormService, FormService>();
            services.AddScoped<IUserService, UserService>();
            services.AddSingleton<IAssessmentFormProvider, StaticFileAssessmentFormProvider>();
            services.AddScoped<IAssessmentService, AssessmentService>();

            services.ConfigureSwagger(Configuration);

            services.AddProblemDetails(ConfigureProblemDetails);
            services.AddSingleton(RabbitHutch.CreateBus(string.Format("host={0}:{1};username={2};password={3}",
                Configuration.GetValue<string>("RabbitMQ:HostName"),
                Configuration.GetValue<int>("RabbitMQ:Port").ToString(),
                Configuration.GetValue<string>("RabbitMQ:User"),
                Configuration.GetValue<string>("RabbitMQ:Password"))
            ));

            services.AddSingleton<IQueueService, QueueService>();
            services.AddHostedService<UserManagementService>();
        }

        public void Configure(IApplicationBuilder app, UserDbContext dbContext)
        {
            dbContext.Database.Migrate();

            app.UseRouting();
            var cookiePolicyOptions = new CookiePolicyOptions
            {
                // Mark cookies as `Secure` (only if using HTTPS in development, and always in production)
                Secure = _environment.IsDevelopment() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always
            };
            app.UseCookiePolicy(cookiePolicyOptions);
            app.UseCors("default");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.OAuthClientId(_swaggerClientName);
                c.OAuthAppName("Swagger UI");
                c.ConfigObject = new ConfigObject
                {
                    Urls = new[]
                    {
                        new UrlDescriptor{Name = "api", Url = "/swagger/v1/swagger.json"}
                    }
                };

            });
        }

        private void ConfigureProblemDetails(ProblemDetailsOptions options)
        {
            // This is the default behavior; only include exception details in a development environment.
            options.IncludeExceptionDetails = (ctx, ex) => _environment.IsDevelopment();

            // This will map NotImplementedException to the 501 Not Implemented status code.
            options.MapToStatusCode<NotImplementedException>(StatusCodes.Status501NotImplemented);

            // This will map HttpRequestException to the 503 Service Unavailable status code.
            options.MapToStatusCode<HttpRequestException>(StatusCodes.Status503ServiceUnavailable);

            // Because exceptions are handled polymorphically, this will act as a "catch all" mapping, which is why it's added last.
            // If an exception other than NotImplementedException and HttpRequestException is thrown, this will handle it.
            options.MapToStatusCode<Exception>(StatusCodes.Status500InternalServerError);
        }
    }

}
