namespace VideoGameCharacterApi.Models;

public class Character
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public int Power { get; set; }
    public int Blood { get; set; }
    public Guid? GameId { get; set; }
    public Game? Game { get; set; }
}
