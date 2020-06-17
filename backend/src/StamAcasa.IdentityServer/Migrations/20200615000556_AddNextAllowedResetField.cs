using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StamAcasa.IdentityServer.Migrations
{
    public partial class AddNextAllowedResetField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "NextAllowedReset",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextAllowedReset",
                table: "AspNetUsers");
        }
    }
}
