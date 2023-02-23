using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Account : Entity
    {
        public string AccountNumber { get; set; } = null!;
        public decimal Balance { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; } = null!;
    }
}
