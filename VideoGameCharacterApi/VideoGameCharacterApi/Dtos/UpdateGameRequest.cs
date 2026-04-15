namespace VideoGameCharacterApi.Dtos;

public class UpdateGameRequest
{
    public string Name { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public DateTime ReleaseDate { get; set; }
    public decimal Price { get; set; }
}
