using Application.Interfaces.Repository;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class OperationLogRepository : Repository<Log>, IOperationLogRepository
    {
        public OperationLogRepository(DBCashier db) : base(db)
        {
        }
    }
}
