using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.Models;

namespace StamAcasa.Common
{
    public class CountiesDbContext : DbContext
    {
        public CountiesDbContext(DbContextOptions<CountiesDbContext> options)
            : base(options)
        {

        }

        public DbSet<County> Counties { get; set; }
        public DbSet<City> Cities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<County>()
                .HasMany(x => x.Cities);

            modelBuilder.Entity<City>()
                .HasOne(x => x.County)
                .WithMany(x => x.Cities)
                .HasForeignKey(x => x.CountyId);
                
        }

    }
}
