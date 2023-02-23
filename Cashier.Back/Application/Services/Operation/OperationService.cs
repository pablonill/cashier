using Application.DTO;
using Application.Interfaces.Repository;
using Domain.Entities;
using Domain.Enums;

namespace Application.Services.Operation
{
    public class OperationService : IOperationService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly ICardRepository _cardRepository;
        private readonly IOperationLogRepository _operationLogRepository;

        public OperationService(IAccountRepository accountRepository, ICardRepository cardRepository, IOperationLogRepository logRepository)
        {
            _accountRepository = accountRepository;
            _cardRepository = cardRepository;
            _operationLogRepository = logRepository;
        }

        public BalanceResult GetBalance(string cardNumber)
        {
            var card = _cardRepository.GetValidCardByCardNumber(cardNumber);

            var balance = _accountRepository.GetBalanceByCardNumberAsync(cardNumber);

            _operationLogRepository.CreateAsync(new Log()
            {
                Card = card,
                OperationType = OperationType.Balance
            });

            return new BalanceResult()
            {
                ExpirationDate = card.ExpirationDate,
                CardNumber = cardNumber,
                Balance = balance
            };
        }

        public DrawalResult WithDrawal(string cardNumber, decimal amount)
        {
            var card = _cardRepository.GetValidCardByCardNumber(cardNumber);

            var balance = _accountRepository.GetBalanceByCardNumberAsync(cardNumber);

            if (amount > balance)
            {
                _operationLogRepository.CreateAsync(new Log()
                {
                    OperationType = OperationType.WithDrawl
                });

                throw new Exception("Insuficient founds");
            }

            var newBalance = balance - amount;

            var operationNumber = _accountRepository.UpdateBalanceByCardNumberAsync(cardNumber, newBalance);


            return new DrawalResult()
            {
                OperationNumber = operationNumber,
                CardNumber = cardNumber,
                NewBalance = newBalance,
                
            };
        }
    }
}
