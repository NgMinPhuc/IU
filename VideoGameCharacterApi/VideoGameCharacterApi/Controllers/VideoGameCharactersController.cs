using Microsoft.AspNetCore.Mvc;
using VideoGameCharacterApi.Common;
using VideoGameCharacterApi.Dtos;
using VideoGameCharacterApi.Services;

namespace VideoGameCharacterApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VideoGameCharactersController(IVideoGameCharacterService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CharacterResponse>>>> GetCharacters()
        => Ok(ApiResponse<List<CharacterResponse>>.Ok(await service.GetAllCharactersAsync()));

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CharacterResponse>>> GetCharacter(Guid id)
    {
        var character = await service.GetCharacterByIdAsync(id);
        return character is null
            ? NotFound(ApiResponse<CharacterResponse>.Fail("Character with the given Id was not found."))
            : Ok(ApiResponse<CharacterResponse>.Ok(character));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<CharacterResponse>>> AddCharacter(CreateCharacterRequest character)
    {
        var created = await service.AddCharacterAsync(character);
        return CreatedAtAction(nameof(GetCharacter), new { id = created.Id },
            ApiResponse<CharacterResponse>.Ok(created, "Character created successfully."));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<CharacterResponse>>> UpdateCharacter(Guid id, UpdateCharacterRequest character)
    {
        var updated = await service.UpdateCharacterAsync(id, character);
        return updated is null
            ? NotFound(ApiResponse<CharacterResponse>.Fail("Character with the given Id was not found."))
            : Ok(ApiResponse<CharacterResponse>.Ok(updated, "Character updated successfully."));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteCharacter(Guid id)
    {
        var deleted = await service.DeleteCharacterAsync(id);
        return deleted
            ? Ok(ApiResponse<object>.Ok(null, "Character deleted successfully."))
            : NotFound(ApiResponse<object>.Fail("Character with the given Id was not found."));
    }
}
