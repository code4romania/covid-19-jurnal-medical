using Microsoft.EntityFrameworkCore.Migrations;

namespace StamAcasa.Common.Migrations
{
    public partial class AddAssessments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assessments",
                columns: table => new
                {
                    Version = table.Column<int>(nullable: false),
                    AssessmentType = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Content = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessments", x => new { x.Version, x.AssessmentType });
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assessments_Id",
                table: "Assessments",
                column: "Id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assessments");
        }
    }
}
