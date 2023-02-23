using Application.Interfaces;
using Application.Services.Auth;
using Application.Services.Card;
using Application.Services.Operation;
using Application.Settings;
using Application.Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class DI
    {
        public static IServiceCollection AddAplication(this IServiceCollection services, ConfigurationManager configuration) {
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
            services.Configure<ApplicationSettings>(configuration.GetSection("AppicationSettings"));
            services.AddScoped<IJWT, JWT>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICardService, CardService>();
            services.AddScoped<IOperationService, OperationService>();

            return services;
        }
    }
}
