using Backend.DTOs;

namespace Backend.Services
{
    public class PreguntaService
    {
        private readonly List<PreguntaDto> _questions = new()
        {
            new PreguntaDto
            {
                Id = 1,
                Order = 1,
                Category = "Política de Tratamiento",
                Question = "¿Cuenta con una política de tratamiento de datos personales?",
                Description = "Verifique si la empresa tiene un documento formal donde se establezcan las reglas para la recolección, uso, almacenamiento, circulación y eliminación de los datos personales conforme a la Ley 1581 de 2012.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 2,
                Order = 2,
                Category = "Política de Tratamiento",
                Question = "¿La política está documentada y publicada en un medio de fácil acceso?",
                Description = "Compruebe que la política esté escrita y pueda ser consultada fácilmente por empleados, clientes o titulares de los datos, por ejemplo en la página web o mediante otro medio accesible.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 3,
                Order = 3,
                Category = "Política de Tratamiento",
                Question = "¿Define las finalidades del tratamiento de datos?",
                Description = "Revise si la política explica claramente para qué se recopilan los datos personales, como prestar un servicio, gestionar contratos, realizar facturación o enviar información autorizada.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 4,
                Order = 4,
                Category = "Política de Tratamiento",
                Question = "¿Incluye los derechos de los titulares?",
                Description = "Verifique que la política informe los derechos de los titulares, como conocer, actualizar, rectificar o solicitar la eliminación de sus datos cuando sea procedente.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 5,
                Order = 5,
                Category = "Política de Tratamiento",
                Question = "¿Menciona cómo ejercer los derechos de los titulares?",
                Description = "Compruebe que la empresa indique los canales y el procedimiento para que los titulares presenten consultas, solicitudes o reclamos relacionados con sus datos personales.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 6,
                Order = 6,
                Category = "Privacidad desde el Diseño",
                Question = "¿Incorpora evaluaciones de impacto (Privacy Impact Assessments)?",
                Description = "Determine si antes de implementar nuevos procesos o sistemas la organización analiza los posibles riesgos para la privacidad y define medidas para mitigarlos.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 7,
                Order = 7,
                Category = "Privacidad desde el Diseño",
                Question = "¿Aplica técnicas de minimización de datos?",
                Description = "Verifique que únicamente se soliciten y utilicen los datos personales estrictamente necesarios para cumplir la finalidad del tratamiento.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 8,
                Order = 8,
                Category = "Privacidad desde el Diseño",
                Question = "¿Configura sus sistemas para recopilar el mínimo de datos por defecto?",
                Description = "Compruebe que formularios, aplicaciones o plataformas solo soliciten la información indispensable desde el inicio, evitando campos innecesarios.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 9,
                Order = 9,
                Category = "Gestión de Riesgos",
                Question = "¿Cuenta con un sistema de administración de riesgos?",
                Description = "Revise si la organización identifica, analiza, evalúa y controla los riesgos asociados al tratamiento de datos personales y realiza seguimiento a las acciones implementadas.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 10,
                Order = 10,
                Category = "Gobierno de Datos",
                Question = "¿Cuenta con un oficial de protección de datos personales?",
                Description = "Verifique si existe una persona o área responsable de coordinar el cumplimiento de las obligaciones relacionadas con la protección de datos personales.",
                Weight = 10
            },

            new PreguntaDto
            {
                Id = 11,
                Order = 11,
                Category = "Gobierno de Datos",
                Question = "¿Está designado formalmente?",
                Description = "Compruebe que el responsable de protección de datos haya sido designado oficialmente mediante un documento, acto administrativo o asignación formal de funciones.",
                Weight = 10
            }
        };

        public List<PreguntaDto> GetQuestions()
        {
            return _questions;
        }
    }
}