using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Settings
{
    public class JwtSettings
    {
        public string Issuer { get; set; } = null!;
        public string Secret { get; set; } = null!;
        public int TokenExpirationInDays { get; set; }
    }
}
