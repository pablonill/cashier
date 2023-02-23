using Application.Interfaces;
using Application.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Application.Utils
{
    public class JWT : IJWT
    {
        private readonly JwtSettings _jwtSettings;
        public JWT(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        public string Generate(string cardNumber)
        {
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)), 
                SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, cardNumber)
            };

            var securityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer, 
                expires: DateTime.Now.AddDays(_jwtSettings.TokenExpirationInDays), 
                claims: claims, 
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}
