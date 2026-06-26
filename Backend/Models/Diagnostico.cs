namespace Backend.Models;

public class Diagnostico
{
    public int Id { get; set; }
    public int EmpresaId { get; set; }
    public int UsuarioId { get; set; }
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public double PorcentajeCumplimiento { get; set; }
    public string Nivel { get; set; } = string.Empty;
    public List<string> Brechas { get; set; } = new();
    public List<string> Recomendaciones { get; set; } = new();
    public List<string> EstrategiasMejora { get; set; } = new();
}
