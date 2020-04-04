using IdentityServer.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StamAcasa.Common.Services.Emailing;
using StamAcasa.IdentityServer;

namespace IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _identityConfiguration = new StamAcasaIdentityConfiguration(configuration);
        }

        public IConfiguration Configuration { get; }
        private readonly IStamAcasaIdentityConfiguration _identityConfiguration;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddRazorPages();
            services.AddControllersWithViews();
            var builder = services.AddIdentityServer(options =>
                {
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

            // not recommended for production - you need to store your key material somewhere secure
            builder.AddDeveloperSigningCredential();
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
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            app.UseStaticFiles();
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
