using Application.Interfaces.Repository;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class CardRepository : Repository<Card>, ICardRepository
    {
        private readonly DBCashier _db;
        public CardRepository(DBCashier db) : base(db)
        {
            _db = db;
        }

        public Card? GetCardByCardNumberAndPinNumber(string cardNumber, int pinNumber)
        {
            var card = _db.Cards.Where(x => x.CardNumber == cardNumber && x.PinNumber == pinNumber && !x.IsLocked).FirstOrDefault();

            return card;
        }

        public Card? GetCardByCardNumber(string cardNumber)
        {
            var card = GetCardIfExist(cardNumber);

            return card;
        }

        public int GetFailedAttempsByCardNumber(string cardNumber)
        {
            var card = GetValidCardByCardNumber(cardNumber);
            
            return card.FailedAttempts;
        }

        public bool GetLockedStatusByCardNumber(string cardNumber)
        {
            var card = GetValidCardByCardNumber(cardNumber);

            return card.IsLocked;
        }

        public async Task UpdateFailedAttepsByCardNumberAsync(string cardNumber, int attemps = 0)
        {
            var card = GetValidCardByCardNumber(cardNumber);

            card.FailedAttempts= attemps;

            await UpdateAsync(card);
        }

        public async Task UpdateLockStatusByCardNumberAsync(string cardNumber, bool newStatus)
        {
            var card = GetValidCardByCardNumber(cardNumber);

            await UpdateAsync(card);
        }

        public Card GetValidCardByCardNumber(string cardNumber)
        {
            var card = GetCardIfExist(cardNumber);

            if (card == null)
            {
                throw new Exception("Invalid card number");
            }

            if (card.IsLocked)
            {
                throw new Exception("The card is locked");
            }

            return card;
        }

        private Card? GetCardIfExist(string cardNumber)
        {
            var card = _db.Cards.Where(x => x.CardNumber == cardNumber).FirstOrDefault();

            return card;
        }
    }
}
