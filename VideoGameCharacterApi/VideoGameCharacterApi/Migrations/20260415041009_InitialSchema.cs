using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace VideoGameCharacterApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Game",
                table: "Characters");

            // PostgreSQL cannot change an IDENTITY column type to uuid in one step.
            // Drop the PK constraint, remove the old integer column, then add a new uuid PK column.
            migrationBuilder.Sql("ALTER TABLE \"Characters\" DROP CONSTRAINT \"PK_Characters\"");
            migrationBuilder.Sql("ALTER TABLE \"Characters\" DROP COLUMN \"Id\"");
            migrationBuilder.Sql("ALTER TABLE \"Characters\" ADD COLUMN \"Id\" uuid NOT NULL DEFAULT gen_random_uuid()");
            migrationBuilder.Sql("ALTER TABLE \"Characters\" ADD CONSTRAINT \"PK_Characters\" PRIMARY KEY (\"Id\")");

            migrationBuilder.AddColumn<int>(
                name: "Blood",
                table: "Characters",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "GameId",
                table: "Characters",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Power",
                table: "Characters",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Genre = table.Column<string>(type: "text", nullable: false),
                    Publisher = table.Column<string>(type: "text", nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Characters_GameId",
                table: "Characters",
                column: "GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Characters_Games_GameId",
                table: "Characters",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Characters_Games_GameId",
                table: "Characters");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Characters_GameId",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Blood",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "GameId",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Power",
                table: "Characters");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Characters",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "Game",
                table: "Characters",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
