using Application.Services.Operation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebAPI.DTO;
using WebAPI.DTO.Operations;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private readonly IOperationService _operationService;

        public OperationController(IOperationService operationService)
        {
            _operationService = operationService;
        }

        [HttpGet("balance")]
        public IActionResult GetBalance()
        {
            var cardNumber = GetCardNumberFromToken();
            var balance = _operationService.GetBalance(cardNumber);

            return Ok(new Response<object>()
            {
                Data = balance,
            });
        }

        [HttpPost("withdrawal")]
        public IActionResult WithDrawal(WithDrawalRequest withDrawalRequest)
        {
            var cardNumber = GetCardNumberFromToken();
            var withDrawal = _operationService.WithDrawal(cardNumber, withDrawalRequest.Amount);

            return this.StatusCode(StatusCodes.Status201Created, new Response<object>()
            {
                Data = withDrawal,
            });
        }

        private string GetCardNumberFromToken()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var sub = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (sub == null) throw new Exception("Invalid card number");

            return sub;
        }
    }
}
