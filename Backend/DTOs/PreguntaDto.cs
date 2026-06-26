namespace Backend.DTOs
{
    public class PreguntaDto
    {
        public int Id { get; set; }

        public string Category { get; set; } = string.Empty;

        public string Question { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int Weight { get; set; }

        public int Order { get; set; }
    }
}