using Microsoft.EntityFrameworkCore;
using VideoGameCharacterApi.Data;
using VideoGameCharacterApi.Dtos;
using VideoGameCharacterApi.Models;

namespace VideoGameCharacterApi.Services.Implement;

public class VideoGameCharacterService(AppDbContext context, ILogger<VideoGameCharacterService> logger) : IVideoGameCharacterService
{
    public async Task<CharacterResponse> AddCharacterAsync(CreateCharacterRequest character)
    {
        logger.LogInformation("VIDEO GAME CHARACTER SERVICE: Starting to add character");
        var newCharacter = new Character
        {
            Name = character.Name,
            Role = character.Role,
            Power = character.Power,
            Blood = character.Blood
        };

        context.Characters.Add(newCharacter);
        await context.SaveChangesAsync();

        logger.LogInformation("VIDEO GAME CHARACTER SERVICE: Finished adding character");
        return new CharacterResponse
        {
            Id = newCharacter.Id,
            Name = newCharacter.Name,
            Role = newCharacter.Role,
            Power = newCharacter.Power,
            Blood = newCharacter.Blood
        };
    }

    public async Task<bool> DeleteCharacterAsync(Guid id)
    {
        logger.LogInformation("VIDEO GAME CHARACTER SERVICE: Starting to delete character" );
        var character = await context.Characters.FindAsync(id);
        if (character is null)
            return false;

        context.Characters.Remove(character);
        await context.SaveChangesAsync();

        logger.LogInformation("VIDEO GAME CHARACTER SERVICE: Finished deleting character");
        return true;
    }

    public async Task<List<CharacterResponse>> GetAllCharactersAsync()
        => await context.Characters
            .Include(c => c.Game)
            .Select(c => new CharacterResponse
            {
                Id = c.Id,
                Name = c.Name,
                Role = c.Role,
                Power = c.Power,
                Blood = c.Blood,
                GameId = c.GameId,
                GameName = c.Game != null ? c.Game.Name : null
            })
            .ToListAsync();

    public async Task<CharacterResponse?> GetCharacterByIdAsync(Guid id)
        => await context.Characters
            .Include(c => c.Game)
            .Where(c => c.Id == id)
            .Select(c => new CharacterResponse
            {
                Id = c.Id,
                Name = c.Name,
                Role = c.Role,
                Power = c.Power,
                Blood = c.Blood,
                GameId = c.GameId,
                GameName = c.Game != null ? c.Game.Name : null
            })
            .FirstOrDefaultAsync();

    public async Task<CharacterResponse?> UpdateCharacterAsync(Guid id, UpdateCharacterRequest character)
    {
        var existing = await context.Characters.FindAsync(id);
        if (existing is null)
            return null;

        existing.Name = character.Name;
        existing.Role = character.Role;
        existing.Power = character.Power;
        existing.Blood = character.Blood;

        await context.SaveChangesAsync();

        return new CharacterResponse
        {
            Id = existing.Id,
            Name = existing.Name,
            Role = existing.Role,
            Power = existing.Power,
            Blood = existing.Blood,
            GameId = existing.GameId
        };
    }
}
