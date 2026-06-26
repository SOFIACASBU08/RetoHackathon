namespace Backend.DTOs
{
    public class EmpresaDto
    {
        public string CompanyName { get; set; } = string.Empty;

        public string Sector { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public int NumberOfEmployees { get; set; }
    }
}
