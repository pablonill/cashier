using Application.Services.Card;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet("{cardNumber}/validate")]
        public IActionResult Validate(string cardNumber)
        {
            var cardStatus = _cardService.GetCardStatus(cardNumber);            

            return Ok(new Response<object>()
            {
                Data = cardStatus,
            });
        }
    }
}
