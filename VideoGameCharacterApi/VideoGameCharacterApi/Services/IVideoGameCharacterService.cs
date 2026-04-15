using VideoGameCharacterApi.Dtos;

namespace VideoGameCharacterApi.Services;

public interface IVideoGameCharacterService
{
    Task<List<CharacterResponse>> GetAllCharactersAsync();
    Task<CharacterResponse?> GetCharacterByIdAsync(Guid id);
    Task<CharacterResponse> AddCharacterAsync(CreateCharacterRequest character);
    Task<CharacterResponse?> UpdateCharacterAsync(Guid id, UpdateCharacterRequest character);
    Task<bool> DeleteCharacterAsync(Guid id);
}
