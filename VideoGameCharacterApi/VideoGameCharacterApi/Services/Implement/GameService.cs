using Microsoft.EntityFrameworkCore;
using VideoGameCharacterApi.Data;
using VideoGameCharacterApi.Dtos;
using VideoGameCharacterApi.Models;

namespace VideoGameCharacterApi.Services.Implement;

public class GameService(AppDbContext context, ILogger<GameService> logger) : IGameService
{
    public async Task<List<GameResponse>> GetAllGamesAsync()
    {
        logger.LogInformation("GAME SERVICE: Starting to retrieve all games");
        var games = await context.Games
            .Include(g => g.Characters)
            .Select(g => new GameResponse
            {
                Id = g.Id,
                Name = g.Name,
                Genre = g.Genre,
                Publisher = g.Publisher,
                ReleaseDate = g.ReleaseDate,
                Price = g.Price,
                Characters = g.Characters.Select(c => new CharacterResponse
                {
                    Id = c.Id,
                    Name = c.Name,
                    Role = c.Role,
                    Power = c.Power,
                    Blood = c.Blood,
                    GameId = c.GameId
                }).ToList()
            }).ToListAsync();

        logger.LogInformation("GAME SERVICE: Finished retrieving all games.");
        return games;
    }

    public async Task<GameResponse?> GetGameByIdAsync(Guid id)
    {
        logger.LogInformation("GAME SERVICE: Starting to retrieve game");
        var game = await context.Games
            .Include(g => g.Characters)
            .Where(g => g.Id == id)
            .Select(g => new GameResponse
            {
                Id = g.Id,
                Name = g.Name,
                Genre = g.Genre,
                Publisher = g.Publisher,
                ReleaseDate = g.ReleaseDate,
                Price = g.Price,
                Characters = g.Characters.Select(c => new CharacterResponse
                {
                    Id = c.Id,
                    Name = c.Name,
                    Role = c.Role,
                    Power = c.Power,
                    Blood = c.Blood,
                    GameId = c.GameId
                }).ToList()
            })
            .FirstOrDefaultAsync();

        logger.LogInformation("GAME SERVICE: Finished retrieving game");
        return game;
    }

    public async Task<GameResponse> AddGameAsync(CreateGameRequest game)
    {
        logger.LogInformation("GAME SERVICE: Starting to add new game");
        var newGame = new Game
        {
            Name = game.Name,
            Genre = game.Genre,
            Publisher = game.Publisher,
            ReleaseDate = DateTime.SpecifyKind(game.ReleaseDate, DateTimeKind.Utc),
            Price = game.Price
        };

        context.Games.Add(newGame);
        await context.SaveChangesAsync();

        logger.LogInformation("GAME SERVICE: Finished adding new game");
        return new GameResponse
        {
            Id = newGame.Id,
            Name = newGame.Name,
            Genre = newGame.Genre,
            Publisher = newGame.Publisher,
            ReleaseDate = newGame.ReleaseDate,
            Price = newGame.Price
        };
    }

    public async Task<GameResponse?> UpdateGameAsync(Guid id, UpdateGameRequest game)
    {
        logger.LogInformation("GAME SERVICE: Starting to update game");
        var existing = await context.Games.FindAsync(id);
        if (existing is null)
            return null;

        existing.Name = game.Name;
        existing.Genre = game.Genre;
        existing.Publisher = game.Publisher;
        existing.ReleaseDate = DateTime.SpecifyKind(game.ReleaseDate, DateTimeKind.Utc);
        existing.Price = game.Price;

        await context.SaveChangesAsync();

        logger.LogInformation("GAME SERVICE: Finished updating game");
        return new GameResponse
        {
            Id = existing.Id,
            Name = existing.Name,
            Genre = existing.Genre,
            Publisher = existing.Publisher,
            ReleaseDate = existing.ReleaseDate,
            Price = existing.Price
        };
    }

    public async Task<bool> DeleteGameAsync(Guid id)
    {
        logger.LogInformation("GAME SERVICE: Starting to delete game with ID {GameId}", id);
        var game = await context.Games
            .Include(g => g.Characters)
            .FirstOrDefaultAsync(g => g.Id == id);

        if (game is null)
            return false;

        if (game.Characters.Count > 0)
            throw new InvalidOperationException("Cannot delete a game that still has characters assigned to it.");

        context.Games.Remove(game);
        await context.SaveChangesAsync();

        logger.LogInformation("GAME SERVICE: Finished deleting game");
        return true;
    }

    public async Task<GameResponse?> AddGameCharacterAsync(Guid gameId, Guid characterId)
    {
        logger.LogInformation("GAME SERVICE: Starting to add character to game");
        var game = await context.Games
            .Include(g => g.Characters)
            .FirstOrDefaultAsync(g => g.Id == gameId);

        if (game is null)
            return null;

        var character = await context.Characters.FindAsync(characterId);
        if (character is null)
            throw new KeyNotFoundException("Character not found.");

        if (character.GameId == gameId)
            throw new InvalidOperationException("Character is already assigned to this game.");

        character.GameId = gameId;
        await context.SaveChangesAsync();

        await context.Entry(game).Collection(g => g.Characters).LoadAsync();

        logger.LogInformation("GAME SERVICE: Finished adding character to game");
        return new GameResponse
        {
            Id = game.Id,
            Name = game.Name,
            Genre = game.Genre,
            Publisher = game.Publisher,
            ReleaseDate = game.ReleaseDate,
            Price = game.Price,
            Characters = game.Characters.Select(c => new CharacterResponse
            {
                Id = c.Id,
                Name = c.Name,
                Role = c.Role,
                Power = c.Power,
                Blood = c.Blood,
                GameId = c.GameId
            }).ToList()
        };
    }

    public async Task<bool> RemoveGameCharacterAsync(Guid gameId, Guid characterId)
    {
        logger.LogInformation("GAME SERVICE: Starting to remove character from game");
        var game = await context.Games.FindAsync(gameId);
        if (game is null)
            return false;

        var character = await context.Characters.FindAsync(characterId);
        if (character is null || character.GameId != gameId)
            return false;

        character.GameId = null;
        await context.SaveChangesAsync();

        logger.LogInformation("GAME SERVICE: Finished removing character from game");
        return true;
    }
}
