using Application.Services.Auth;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;
using WebAPI.DTO.Auth;

namespace WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public IActionResult Authenticate([FromBody] AuthCardRequest authCardRequest)
        {
            var token = _authService.AuthWithCardAndPIN(authCardRequest.CardNumber, authCardRequest.PinNumber);

            return Ok(new Response<object>()
            {
                Data = token
            });
        }
    }
}
