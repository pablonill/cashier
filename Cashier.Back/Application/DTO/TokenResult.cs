using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTO
{
    public class TokenResult
    {
        public string CardNumber { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}
