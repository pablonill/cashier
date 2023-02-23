using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repository
{
    public interface ICardRepository : IRepository<Card>
    {
        bool GetLockedStatusByCardNumber(string cardNumber);
        Card? GetCardByCardNumberAndPinNumber(string cardNumber, int pinNumber);
        Task UpdateFailedAttepsByCardNumberAsync(string cardNumber, int attemps = 0);
        int GetFailedAttempsByCardNumber(string cardNumber);
        Task UpdateLockStatusByCardNumberAsync(string cardNumber, bool newStatus);
        Card? GetCardByCardNumber(string cardNumber);
        Card GetValidCardByCardNumber(string cardNumber);
    }
}
