using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManageTheGame.Data.Migrations
{
    public partial class CompetitionClubLogicfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompetitionClubs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CompetitionId = table.Column<Guid>(nullable: false),
                    ClubId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionClubs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompetitionClubs_Clubs_ClubId",
                        column: x => x.ClubId,
                        principalTable: "Clubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionClubs_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionClubs_ClubId",
                table: "CompetitionClubs",
                column: "ClubId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionClubs_CompetitionId",
                table: "CompetitionClubs",
                column: "CompetitionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompetitionClubs");
        }
    }
}
