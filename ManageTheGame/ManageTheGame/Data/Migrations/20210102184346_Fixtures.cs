using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManageTheGame.Data.Migrations
{
    public partial class Fixtures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fixtures",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Duration = table.Column<int>(nullable: false),
                    HomeGoals = table.Column<int>(nullable: false),
                    AwayGoals = table.Column<int>(nullable: false),
                    Gameweek = table.Column<int>(nullable: false),
                    CompetitionId = table.Column<Guid>(nullable: false),
                    HomeId = table.Column<Guid>(nullable: false),
                    AwayId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fixtures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fixtures_Clubs_AwayId",
                        column: x => x.AwayId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Fixtures_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Fixtures_Clubs_HomeId",
                        column: x => x.HomeId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_AwayId",
                table: "Fixtures",
                column: "AwayId");

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_CompetitionId",
                table: "Fixtures",
                column: "CompetitionId");

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_HomeId",
                table: "Fixtures",
                column: "HomeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fixtures");
        }
    }
}
