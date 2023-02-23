using Application.DTO;
using Application.Interfaces;
using Application.Interfaces.Repository;
using Application.Settings;
using Application.Utils;
using Microsoft.Extensions.Options;

namespace Application.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly ICardRepository _cardRepository;
        private readonly ApplicationSettings _applicationSettings;
        private readonly IJWT _jwt;

        public AuthService(
            ICardRepository cardRepository,
            IOptions<ApplicationSettings> applicationSettings,
            IJWT jwt)
        {
            _cardRepository = cardRepository;
            _applicationSettings = applicationSettings.Value;
            _jwt = jwt;
        }

        public TokenResult AuthWithCardAndPIN(string cardNumber, int pinNumber)
        {
            // var encryptedPinNumber = Crypto.Hash(pinNumber);
            var card = _cardRepository.GetCardByCardNumberAndPinNumber(cardNumber, pinNumber);

            if (card == null) {
                IncreaseFailedAttemps(cardNumber);

                throw new Exception("Invalid card or pin number");
            };

            ResetFailedAttemps(cardNumber);

            var result = new TokenResult()
            {
                CardNumber = cardNumber,
                Token = _jwt.Generate(cardNumber)
            };

            return result;
        }

        private void ResetFailedAttemps(string cardNumber)
        {
            _cardRepository.UpdateFailedAttepsByCardNumberAsync(cardNumber);
        }

        private void IncreaseFailedAttemps(string cardNumber)
        {
            var failedAttemps = _cardRepository.GetFailedAttempsByCardNumber(cardNumber);
            failedAttemps++;
            _cardRepository.UpdateFailedAttepsByCardNumberAsync(cardNumber, failedAttemps);

            if (failedAttemps == _applicationSettings.MaxFailedAttemps)
            {
                _cardRepository.UpdateLockStatusByCardNumberAsync(cardNumber, true);
            }
        }
    }
}
