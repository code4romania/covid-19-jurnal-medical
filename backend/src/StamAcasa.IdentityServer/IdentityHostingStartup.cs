using System;
using IdentityServer;
using IdentityServer.Data;
using IdentityServerAspNetIdentity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(IdentityHostingStartup))]
namespace IdentityServer
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseNpgsql(
                        context.Configuration.GetConnectionString("ApplicationDbContextConnection"), sqlOptions =>
                        {
                            sqlOptions.EnableRetryOnFailure(
                                maxRetryCount: 5,
                                maxRetryDelay: TimeSpan.FromSeconds(5),
                                errorCodesToAdd: null
                                );
                        }));
                var emailConfirmation = context.Configuration.GetValue<bool>("EnableEmailConfirmation");
                services.AddDefaultIdentity<ApplicationUser>(options =>
                        options.SignIn.RequireConfirmedAccount = emailConfirmation)
                    .AddEntityFrameworkStores<ApplicationDbContext>();

                SeedData.EnsureSeedData(context.Configuration.GetConnectionString("ApplicationDbContextConnection"));
            });
        }
    }
}