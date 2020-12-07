  
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

  public class ProductsController : BaseApiController
  {
    private readonly IProductRepository _productsRepo;
    private readonly DataContext _context;
    public ProductsController(IProductRepository productsRepo, DataContext context)
    {
      _context = context;
      _productsRepo = productsRepo;

    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string sort )
    {

      var allProducts = await _productsRepo.GetAllProductsAsync(sort);

          var Products = allProducts.AsQueryable();
      if(!string.IsNullOrEmpty(sort)){
        
        switch(sort)
        {
          case "priceasc":
          Products = Products.OrderBy(x => x.price);
          break;
          case "pricedesc":
          Products = Products.OrderByDescending(x => x.price);
          break;
          case "nameasc":
          Products = Products.OrderBy(x => x.name);
          break;
          case "namedesc":
          Products = Products.OrderByDescending(x => x.name);
          break;
        }


      }

      return Products.ToList();
    }


    [HttpGet("{id}")]

    public async Task<ActionResult<Product>> GetProduct(int id )
    {


      var product = await _productsRepo.GetProductByIdAsync(id);


      return product;
    }


  }
}