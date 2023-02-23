using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTO
{
    public class DrawalResult
    {
        public int OperationNumber { get; set; }
        public string CardNumber { get; set; } = null!;
        public decimal NewBalance { get; set; }
    }
}
