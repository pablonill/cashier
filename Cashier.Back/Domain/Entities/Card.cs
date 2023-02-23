using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Card : Entity
    {
        public string CardNumber { get; set; } = null!;
        public int PinNumber { get; set; }
        public bool IsLocked { get; set; }
        public int FailedAttempts { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
