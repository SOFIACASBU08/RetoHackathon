namespace Backend.Models;

public class RespuestaDiagnostico
{
    public int PreguntaId { get; set; }
    public int Valor { get; set; }
    public string? Observacion { get; set; }
}
