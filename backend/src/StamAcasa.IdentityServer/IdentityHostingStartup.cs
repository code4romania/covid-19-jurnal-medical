﻿using IdentityServer;
using IdentityServer.Data;
using IdentityServerAspNetIdentity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
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
                        context.Configuration.GetConnectionString("ApplicationDbContextConnection")));
                var emailConfirmation = context.Configuration.GetValue<bool>("EnableEmailConfirmation");
                services.AddDefaultIdentity<ApplicationUser>(options =>
                        options.SignIn.RequireConfirmedAccount = emailConfirmation)
                    .AddRoles<IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationDbContext>();

                SeedData.EnsureSeedData(context.Configuration.GetConnectionString("ApplicationDbContextConnection"));
            });
        }
    }
}