using IdentityServer;
using IdentityServer.Data;
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
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlite(
                        context.Configuration.GetConnectionString("ApplicationDbContextConnection")));
                var emailConfirmation = context.Configuration.GetValue<bool>("EnableEmailConfirmation");
                services.AddDefaultIdentity<ApplicationUser>(options => 
                        options.SignIn.RequireConfirmedAccount = emailConfirmation)
                    .AddEntityFrameworkStores<ApplicationDbContext>();
            });
        }
    }
}