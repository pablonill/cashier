using Application.DTO;
using Application.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Card
{
    public class CardService : ICardService
    {
        private readonly ICardRepository _cardRepository;

        public CardService(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public CardStatusResult GetCardStatus(string cardNumber)
        {
            var isLocked = _cardRepository.GetLockedStatusByCardNumber(cardNumber);

            return new CardStatusResult()
            {
                CardNumber = cardNumber,
                IsLocked = isLocked
            };
        }
    }
}
