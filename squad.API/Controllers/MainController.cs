using Microsoft.AspNetCore.Mvc;

namespace squad.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainController : ControllerBase
    {
        private readonly Random random;
        public MainController()
        {
            random = new Random();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var randomNumber = random.Next(0, Phones.Numbers.Length - 1);
            return Ok(Phones.Numbers[randomNumber].ToString());
        }
    }
}