using Microsoft.EntityFrameworkCore.Migrations;

namespace StamAcasa.IdentityServer.Migrations
{
    public partial class AddResetCounterField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResetCounter",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResetCounter",
                table: "AspNetUsers");
        }
    }
}
