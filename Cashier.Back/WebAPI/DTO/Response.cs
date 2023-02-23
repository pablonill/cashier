namespace WebAPI.DTO
{
    public class Response<T>
    {
        public bool IsError { get; set; }
        public string Message { get; set; } = "All operations returned successfull status";
        public T? Data { get; set; }
    }
}
