namespace Backend.DTOs
{
    public class ResultadoDto
    {
        public double CompliancePercentage { get; set; }

        public string Level { get; set; } = string.Empty;

        public List<string> Recommendations { get; set; } = new();
    }
}