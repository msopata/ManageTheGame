using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManageTheGame.Data.Migrations
{
    public partial class CompetitionClubLogic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Started",
                table: "Competitions",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "CompetitionId",
                table: "Clubs",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_CompetitionId",
                table: "Clubs",
                column: "CompetitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clubs_Competitions_CompetitionId",
                table: "Clubs",
                column: "CompetitionId",
                principalTable: "Competitions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clubs_Competitions_CompetitionId",
                table: "Clubs");

            migrationBuilder.DropIndex(
                name: "IX_Clubs_CompetitionId",
                table: "Clubs");

            migrationBuilder.DropColumn(
                name: "Started",
                table: "Competitions");

            migrationBuilder.DropColumn(
                name: "CompetitionId",
                table: "Clubs");
        }
    }
}
