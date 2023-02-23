using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTO
{
    public class CardStatusResult
    {
        public string CardNumber { get; set; } = null!;
        public bool IsLocked { get; set; }
    }
}
