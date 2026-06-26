namespace Backend.Models;

public class Empresa
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Nit { get; set; } = string.Empty;
    public string? Direccion { get; set; }
    public string? EmailContacto { get; set; }
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
}
