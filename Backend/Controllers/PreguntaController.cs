using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PreguntaController : ControllerBase
    {
        private readonly PreguntaService _preguntaService;

        public PreguntaController(PreguntaService preguntaService)
        {
            _preguntaService = preguntaService;
        }

        [HttpGet]
        public IActionResult GetQuestions()
        {
            var questions = _preguntaService.GetQuestions();
            return Ok(questions);
        }
    }
}