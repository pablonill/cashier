using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class DBCashier : DbContext
    {
        public DBCashier(DbContextOptions<DBCashier> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Log>().HasKey(x => x.OperationNumber);
            modelBuilder.Entity<Log>().Property(x => x.OperationNumber).ValueGeneratedOnAdd();

            // Seed data

            // Cards
            modelBuilder.Entity<Card>().HasData(new Card()
            {
                Id = 1,
                CardNumber = "7777333399995555",
                PinNumber = 1234,
                IsLocked = false,
                FailedAttempts = 0,
                ExpirationDate = DateTime.UtcNow.AddMonths(3),
            });

            modelBuilder.Entity<Card>().HasData(new Card()
            {
                Id = 2,
                CardNumber = "8888333399995555",
                PinNumber = 4444,
                IsLocked = false,
                FailedAttempts = 0,
                ExpirationDate = DateTime.UtcNow.AddMonths(1),
            });

            // Accounts
            modelBuilder.Entity<Account>().HasData(new Account()
            {
                Id = 1,
                AccountNumber = "998338874777678833244",
                CardId = 1,
                Balance = 100000
            });

            modelBuilder.Entity<Account>().HasData(new Account()
            {
                Id = 2,
                AccountNumber = "458334864777678833244",
                CardId = 2,
                Balance = 100000
            });
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Log> Logs { get; set; }
    }


    // Used only for migrations tools
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DBCashier>
    {
        public DBCashier CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<DBCashier>();
            var connectionString = configuration.GetConnectionString("DefaultConnection"); ;
            builder.UseSqlServer(connectionString);
            return new DBCashier(builder.Options);
        }
    }
}
