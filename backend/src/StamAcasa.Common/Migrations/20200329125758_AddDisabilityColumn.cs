using Microsoft.EntityFrameworkCore.Migrations;

namespace StamAcasa.Common.Migrations
{
    public partial class AddDisabilityColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Disability",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Disability",
                table: "Users");
        }
    }
}
