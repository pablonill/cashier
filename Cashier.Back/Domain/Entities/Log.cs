using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Log
    {
        public int OperationNumber { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; } = null!;
        public decimal Balance { get; set; }
        public OperationType OperationType { get; set; }
        public DateTime OperationDate { get; set; } = DateTime.Now;
    }
}
