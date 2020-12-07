using Microsoft.AspNetCore.Mvc;
using API.Errors;

namespace API.Controllers
{
[Route("errors/{code}")]

    public class ErrorController : BaseApiController
    {

        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiException(code));
        }
        
    }
}