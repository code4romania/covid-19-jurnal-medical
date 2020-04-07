using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StamAcasa.Common;

namespace StamAcasa.Api.Extensions
{
    public static class PostgreSqlExtension
    {
        public static void AddPostgreSqlDbContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContextPool<UserDbContext>(options =>
                options.UseNpgsql(config.GetConnectionString("UserDBConnection")));
        }
    }
}
