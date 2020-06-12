using Microsoft.EntityFrameworkCore.Migrations;

namespace StamAcasa.IdentityServer.Migrations
{
    public partial class AddPreviusPasswordsColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PreviousPasswords",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviousPasswords",
                table: "AspNetUsers");
        }
    }
}
