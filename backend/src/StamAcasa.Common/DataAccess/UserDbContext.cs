using System.Text.Json;
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
        public DbSet<Form> Forms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(x => x.ParentUser)
                .WithMany(x => x.DependentUsers)
                .HasForeignKey(x => x.ParentId);

            modelBuilder.Entity<Form>()
                .HasOne(x => x.User)
                .WithMany(x => x.Forms)
                .HasForeignKey(x => x.UserId);
        }

    }
}
