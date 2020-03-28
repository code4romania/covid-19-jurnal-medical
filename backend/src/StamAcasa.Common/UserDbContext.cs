using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.Models;

namespace StamAcasa.Common
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<AssessmentHistory> AssessmentHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .HasOne(x => x.ParentUser)
                .WithMany(x => x.DependentUsers)
                .HasForeignKey(x => x.ParentId);

            modelBuilder.Entity<AssessmentHistory>()
            .HasOne(x => x.User);            
        }

    }
}
