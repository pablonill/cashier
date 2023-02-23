using Application.Interfaces.Repository;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        private readonly DBCashier _db;
        public AccountRepository(DBCashier db) : base(db)
        {
            _db = db;
        }

        public decimal GetBalanceByCardNumberAsync(string cardNumber)
        {
            var account = _db.Accounts.Where(x => x.Card.CardNumber == cardNumber).FirstOrDefault();

            if (account == null)
            {
                return 0;
            }

            return account.Balance;
        }

        public int UpdateBalanceByCardNumberAsync(string cardNumber, decimal amount)
        {
            using var transaction = _db.Database.BeginTransaction();

            try
            {
                var account = _db.Accounts.Where(x => x.Card.CardNumber == cardNumber).FirstOrDefault();

                if (account == null)
                {
                    return 0;
                }

                account.UpdatedAt = DateTime.Now;
                account.Balance = amount;

                _db.Accounts.Update(account);
                _db.SaveChanges();

                var operation = _db.Set<Log>().Add(new Log()
                {
                    CardId = account.CardId,
                    OperationType = OperationType.WithDrawl,
                    Balance = amount,
                });
                _db.SaveChanges();

                transaction.Commit();

                return operation.Entity.OperationNumber;
            } catch
            {
                transaction.Rollback();
                throw new Exception("Unable to update balance");
            }

        }
    }
}
