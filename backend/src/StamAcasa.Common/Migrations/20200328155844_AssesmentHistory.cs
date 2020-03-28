using Microsoft.EntityFrameworkCore.Migrations;

namespace StamAcasa.Common.Migrations
{
    public partial class AssesmentHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssessmentHistories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Sub = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: true),
                    AssessmentDate = table.Column<long>(nullable: false),
                    FileName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssessmentHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssessmentHistories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssessmentHistories_UserId",
                table: "AssessmentHistories",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssessmentHistories");
        }
    }
}
