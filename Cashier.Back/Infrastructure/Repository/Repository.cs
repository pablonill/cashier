using Application.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DBCashier _db;

        public Repository(DBCashier db)
        {
            _db = db;
        }

        public async Task CreateAsync(T entity)
        {
            await _db.AddAsync(entity);
            _db.SaveChanges();
        }

        public async Task Delete(int id)
        {
            var entity = await GetByIdAsync(id);

            if (entity != null) {
                _db.Remove(entity);
            }
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            var result = await _db.Set<T>().ToListAsync();

            return result;
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            var entity = await _db.Set<T>().FindAsync(id);

            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _db.Update(entity);
            await _db.SaveChangesAsync();
        }
    }
}
