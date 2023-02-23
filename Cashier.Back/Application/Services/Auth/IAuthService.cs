using Application.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Auth
{
    public interface IAuthService
    {
        TokenResult AuthWithCardAndPIN(string cardNumber, int pinNumber);
    }
}
