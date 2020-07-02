using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using IdentityServer.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.IdentityServer;
using StamAcasa.Common.Queue;
using EasyNetQ;
using StamAcasa.IdentityServer.Helpers;
using StamAcasa.IdentityServer.Options;

namespace IdentityServer
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _env = env;
            Configuration = configuration;
            _identityConfiguration = new StamAcasaIdentityConfiguration(configuration);
        }

        public IConfiguration Configuration { get; }
        private readonly IStamAcasaIdentityConfiguration _identityConfiguration;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            var allowedRedirectUrls = new List<string>();
            Configuration.GetSection("AllowedRedirectUrls").Bind(allowedRedirectUrls);

            var allowedRedirects = new AllowedRedirects
            {
                Urls = allowedRedirectUrls
                    .Where(x => !string.IsNullOrEmpty(x))
                    .Select(UrlHelpers.NormalizeUrl)
                    .Where(url => _env.IsDevelopment() || url.StartsWith("https")) // on prod do not allow redirects to http
                    .Distinct()
                    .ToList()
            };

            services.AddSingleton(allowedRedirects);
            services.AddRazorPages();
            services.AddControllersWithViews();
            var builder = services.AddIdentityServer(options =>
                {
                    var publicOrigin = Configuration["IdentityServerPublicOrigin"];
                    if (!string.IsNullOrEmpty(publicOrigin))
                    {
                        options.PublicOrigin = publicOrigin;
                    }

                    options.UserInteraction.LoginUrl = "/account/login";
                    options.UserInteraction.LogoutUrl = "/account/logout";

                    options.Events.RaiseErrorEvents = true;
                    options.Events.RaiseInformationEvents = true;
                    options.Events.RaiseFailureEvents = true;
                    options.Events.RaiseSuccessEvents = true;
                })
                .AddInMemoryIdentityResources(_identityConfiguration.Ids)
                .AddInMemoryApiResources(_identityConfiguration.Apis())
                .AddInMemoryClients(_identityConfiguration.Clients)
                .AddAspNetIdentity<ApplicationUser>();

            var base64EncodedCertificate = Configuration["Certificate:Base64Encoded"];
            var password = Configuration["Certificate:Password"];

            builder.AddSigningCredential(LoadCertificate(base64EncodedCertificate, password));

            services.AddAuthentication();
            var emailType = Configuration.GetValue<EmailingSystemTypes>("EMailingSystem");
            switch (emailType)
            {
                case EmailingSystemTypes.SendGrid:
                    services.AddSingleton<IEmailSender>(ctx =>
                        new SendGridSender(
                            new SendGridOptions
                            {
                                ApiKey = Configuration["SendGrid:ApiKey"],
                                ClickTracking = Configuration.GetValue<bool>("SendGrid:ClickTracking")
                            }
                        )
                    );
                    break;
                case EmailingSystemTypes.Smtp:
                    services.AddSingleton<IEmailSender>(ctx =>
                        new SmtpSender(
                            new SmtpOptions
                            {
                                Host = Configuration["Smtp:Host"],
                                Port = Configuration.GetValue<int>("Smtp:Port"),
                                User = Configuration["Smtp:User"],
                                Password = Configuration["Smtp:Password"]
                            }
                        )
                    );
                    break;
            }

            services.AddSingleton(RabbitHutch.CreateBus(string.Format("host={0}:{1};username={2};password={3}",
                                            Configuration.GetValue<string>("RabbitMQ:HostName"),
                                            Configuration.GetValue<int>("RabbitMQ:Port").ToString(),
                                            Configuration.GetValue<string>("RabbitMQ:User"),
                                            Configuration.GetValue<string>("RabbitMQ:Password"))
                ));
            services.AddSingleton<IQueueService, QueueService>();
            services.AddSingleton<PasswordValidationMessages>();
        }

        private X509Certificate2 LoadCertificate(string base64EncodedCertificate, string password)
        {
            var certificateBytes = Convert.FromBase64String(base64EncodedCertificate);

            var certificate = new X509Certificate2(certificateBytes, password, X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet | X509KeyStorageFlags.Exportable);
            return certificate;
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            app.UseStaticFiles();
            var cookiePolicyOptions = new CookiePolicyOptions
            {
                // Mark cookies as `Secure` (only if using HTTPS in development, and always in production)
                Secure = env.IsDevelopment() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always
            };
            app.UseCookiePolicy(cookiePolicyOptions);

            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllers();
                endpoints.MapRazorPages();
            });
        }
    }
}
