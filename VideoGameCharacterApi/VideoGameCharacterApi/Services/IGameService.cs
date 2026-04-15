using VideoGameCharacterApi.Dtos;

namespace VideoGameCharacterApi.Services;

public interface IGameService
{
    Task<List<GameResponse>> GetAllGamesAsync();
    Task<GameResponse?> GetGameByIdAsync(Guid id);
    Task<GameResponse> AddGameAsync(CreateGameRequest game);
    Task<GameResponse?> UpdateGameAsync(Guid id, UpdateGameRequest game);
    Task<GameResponse?> AddGameCharacterAsync(Guid gameId, Guid characterId);
    Task<bool> RemoveGameCharacterAsync(Guid gameId, Guid characterId);
    Task<bool> DeleteGameAsync(Guid id);
}
