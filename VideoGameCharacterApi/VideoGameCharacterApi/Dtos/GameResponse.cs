namespace VideoGameCharacterApi.Dtos;

public class GameResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public DateTime ReleaseDate { get; set; }
    public decimal Price { get; set; }
    public List<CharacterResponse> Characters { get; set; } = [];
}