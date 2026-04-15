using Microsoft.AspNetCore.Mvc;
using VideoGameCharacterApi.Common;
using VideoGameCharacterApi.Dtos;
using VideoGameCharacterApi.Services;

namespace VideoGameCharacterApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VideoGameCharactersController(IVideoGameCharacterService service, ILogger<VideoGameCharactersController> logger) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CharacterResponse>>>> GetCharacters()
    {
        logger.LogInformation("VIDEO GAME CHARACTERS CONTROLLER: Starting to retrieve all characters");
        return Ok(ApiResponse<List<CharacterResponse>>.Ok(await service.GetAllCharactersAsync()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CharacterResponse>>> GetCharacter(Guid id)
    {
        logger.LogInformation("VIDEO GAME CHARACTERS CONTROLLER: Retrieving character");
        var character = await service.GetCharacterByIdAsync(id);
        return character is null
            ? NotFound(ApiResponse<CharacterResponse>.Fail("Character with the given Id was not found."))
            : Ok(ApiResponse<CharacterResponse>.Ok(character));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<CharacterResponse>>> AddCharacter(CreateCharacterRequest character)
    {
        logger.LogInformation("VIDEO GAME CHARACTERS CONTROLLER: Adding new character");
        var created = await service.AddCharacterAsync(character);
        return CreatedAtAction(nameof(GetCharacter), new { id = created.Id },
            ApiResponse<CharacterResponse>.Ok(created, "Character created successfully."));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<CharacterResponse>>> UpdateCharacter(Guid id, UpdateCharacterRequest character)
    {
        logger.LogInformation("VIDEO GAME CHARACTERS CONTROLLER: Updating character");
        var updated = await service.UpdateCharacterAsync(id, character);
        return updated is null
            ? NotFound(ApiResponse<CharacterResponse>.Fail("Character with the given Id was not found."))
            : Ok(ApiResponse<CharacterResponse>.Ok(updated, "Character updated successfully."));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteCharacter(Guid id)
    {
        logger.LogInformation("VIDEO GAME CHARACTERS CONTROLLER: Deleting character");
        var deleted = await service.DeleteCharacterAsync(id);
        return deleted
            ? Ok(ApiResponse<object>.Ok(null, "Character deleted successfully."))
            : NotFound(ApiResponse<object>.Fail("Character with the given Id was not found."));
    }
}
