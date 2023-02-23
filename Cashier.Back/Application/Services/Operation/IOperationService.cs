using Application.DTO;
using Application.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Operation
{
    public interface IOperationService
    {
        BalanceResult GetBalance(string cardNumber);
        DrawalResult WithDrawal(string cardNumber, decimal amount);
    }
}
