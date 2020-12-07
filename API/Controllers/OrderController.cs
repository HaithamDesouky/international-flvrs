  
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

  public class OrderController : BaseApiController
  {
    private readonly IOrderService _orderService;
    public OrderController(IOrderService orderService)
    {
      _orderService = orderService;

    }

    [HttpPost]

    public async Task<ActionResult<Order>> CreateOrder(Order orderReceived)
    {

     var order = await _orderService.CreateOrder( orderReceived);

    if(order == null) return BadRequest("Problem creating order");

    return order;

    }

        



    // [HttpGet("{id}")]

  //   public async Task<ActionResult<ProductDto>> GetProduct(int id )
  //   {


  //     var product = await _productsRepo.GetProductByIdAsync(id);


  //     return _mapper.Map<Product, ProductDto>(product);
  //   }




   }
}