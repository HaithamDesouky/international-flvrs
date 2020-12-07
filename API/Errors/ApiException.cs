namespace API.Errors
{
  public class ApiException
  {
    public ApiException(int statusCode, string message = null, string details = null)
    {
     StatusCode = statusCode;
     Message = message ?? getDefaultMessageForStatusCode(statusCode);
     Details = details;

    }
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }

    private string getDefaultMessageForStatusCode(int statusCode)
  {
    return statusCode switch
    {
      400 => "A bad request, you have made",
      401 => "Unauthorized lol",
      404 => "no tengo nada sorry",
      500 => "Error noooo",
      _ => null
    };
  }
  }

  
}