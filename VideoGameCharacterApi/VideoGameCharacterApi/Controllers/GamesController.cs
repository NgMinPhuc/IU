using Microsoft.AspNetCore.Mvc;
using VideoGameCharacterApi.Common;
using VideoGameCharacterApi.Dtos;
using VideoGameCharacterApi.Services;

namespace VideoGameCharacterApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GamesController(IGameService service, ILogger<GamesController> logger) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<GameResponse>>>> GetGames()
    {
        logger.LogInformation("GAMES CONTROLLER: Starting to retrieve all games");
        return Ok(ApiResponse<List<GameResponse>>.Ok(await service.GetAllGamesAsync()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<GameResponse>>> GetGame(Guid id)
    {
        logger.LogInformation("GAMES CONTROLLER: Retrieving game with ID {GameId}", id);
        var game = await service.GetGameByIdAsync(id);
        return game is null
            ? NotFound(ApiResponse<GameResponse>.Fail("Game with the given Id was not found."))
            : Ok(ApiResponse<GameResponse>.Ok(game));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<GameResponse>>> AddGame(CreateGameRequest game)
    {
        logger.LogInformation("GAMES CONTROLLER: Adding new game with name {GameName}", game.Name);
        var created = await service.AddGameAsync(game);
        return CreatedAtAction(nameof(GetGame), new { id = created.Id },
            ApiResponse<GameResponse>.Ok(created, "Game created successfully."));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<GameResponse>>> UpdateGame(Guid id, UpdateGameRequest game)
    {
        logger.LogInformation("GAMES CONTROLLER: Updating game with ID {GameId}", id);
        var updated = await service.UpdateGameAsync(id, game);
        return updated is null
            ? NotFound(ApiResponse<GameResponse>.Fail("Game with the given Id was not found."))
            : Ok(ApiResponse<GameResponse>.Ok(updated, "Game updated successfully."));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object?>>> DeleteGame(Guid id)
    {
        logger.LogInformation("GAMES CONTROLLER: Deleting game with ID {GameId}", id);
        try
        {
            var deleted = await service.DeleteGameAsync(id);
            return deleted
                ? Ok(ApiResponse<object?>.Ok(null, "Game deleted successfully."))
                : NotFound(ApiResponse<object?>.Fail("Game with the given Id was not found."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<object?>.Fail(ex.Message));
        }
    }

    [HttpPost("{gameId}/characters/{characterId}")]
    public async Task<ActionResult<ApiResponse<GameResponse>>> AddGameCharacter(Guid gameId, Guid characterId)
    {
        logger.LogInformation("GAMES CONTROLLER: Adding character {CharacterId} to game {GameId}", characterId, gameId);
        try
        {
            var result = await service.AddGameCharacterAsync(gameId, characterId);
            return result is null
                ? NotFound(ApiResponse<GameResponse>.Fail("Game with the given Id was not found."))
                : Ok(ApiResponse<GameResponse>.Ok(result, "Character added to game successfully."));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse<GameResponse>.Fail(ex.Message));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<GameResponse>.Fail(ex.Message));
        }
    }

    [HttpDelete("{gameId}/characters/{characterId}")]
    public async Task<ActionResult<ApiResponse<object?>>> RemoveGameCharacter(Guid gameId, Guid characterId)
    {
        logger.LogInformation("GAMES CONTROLLER: Removing character {CharacterId} from game {GameId}", characterId, gameId);
        var removed = await service.RemoveGameCharacterAsync(gameId, characterId);
        return removed
            ? Ok(ApiResponse<object?>.Ok(null, "Character removed from game successfully."))
            : NotFound(ApiResponse<object?>.Fail("Game or Character with the given Id was not found."));
    }
}
