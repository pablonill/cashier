namespace WebAPI.DTO.Auth
{
    public class AuthCardRequest
    {
        public string CardNumber { get; set; } = null!;
        public int PinNumber { get; set; }
    }
}
