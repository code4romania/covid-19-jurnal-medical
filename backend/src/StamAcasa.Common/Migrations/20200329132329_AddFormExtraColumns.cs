using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StamAcasa.Common.Migrations
{
    public partial class AddFormExtraColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FormTypeId",
                table: "Forms",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Timestamp",
                table: "Forms",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FormTypeId",
                table: "Forms");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Forms");
        }
    }
}
