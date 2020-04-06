using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using StamAcasa.Common.JsonFIles;
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
        public DbSet<Assessment> Assessments { get; set; }

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

            modelBuilder.Entity<Assessment>()
                .HasKey(a => new {a.Version, ForUserWithProfileFilledIn = a.AssessmentType});

            modelBuilder.Entity<Assessment>()
                .HasIndex(a => a.Id)
                .IsUnique();


            modelBuilder.Entity<Assessment>().HasData(new Assessment()
            {
                Id = 1,
                Version = 1,
                AssessmentType = AssessmentType.NewUser,
                Content = JsonFilesLibrary.GetAssessmentQ1()
            });
            
            modelBuilder.Entity<Assessment>().HasData(new Assessment()
            {
                Id = 2,
                Version = 1,
                AssessmentType = AssessmentType.UserWithProfileFilledIn,
                Content = JsonFilesLibrary.GetAssessmentQ1A()
            });
        }

    }
}
