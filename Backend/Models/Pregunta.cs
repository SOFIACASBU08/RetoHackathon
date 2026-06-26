namespace Backend.Models;

public class Pregunta
{
    public int Id { get; set; }
    public string Texto { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public int Orden { get; set; }
    public string Ayuda { get; set; } = string.Empty;
}
