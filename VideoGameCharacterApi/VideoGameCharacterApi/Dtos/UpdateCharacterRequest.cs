namespace VideoGameCharacterApi.Dtos;

public class UpdateCharacterRequest
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public int Power { get; set; }
    public int Blood { get; set; }
}
