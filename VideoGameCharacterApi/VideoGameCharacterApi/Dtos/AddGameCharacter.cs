namespace VideoGameCharacterApi.Dtos
{
    public class AddGameCharacter
    {
        public List<CharacterResponse> Characters { get; set; } = new();
    }
}