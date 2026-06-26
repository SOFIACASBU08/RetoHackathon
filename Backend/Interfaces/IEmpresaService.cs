using Backend.Models;

namespace Backend.Interfaces;

public interface IEmpresaService
{
    Task<Empresa> CrearAsync(Empresa empresa);
}
