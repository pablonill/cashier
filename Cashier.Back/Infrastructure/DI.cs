using Application.Interfaces.Repository;
using Application.Services.Auth;
using Application.Services.Card;
using Application.Services.Operation;
using Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DI
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager configuration)
        {            
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICardService, CardService>();
            services.AddScoped<IOperationService, OperationService>();

            services.AddDbContext<DBCashier>(options => options.UseSqlServer(configuration.GetSection("ConnectionStrings").GetValue<string>("DefaultConnection")));

            services.AddScoped<IOperationLogRepository, OperationLogRepository>();
            services.AddScoped<ICardRepository, CardRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();

            return services;
        }
    }
}
