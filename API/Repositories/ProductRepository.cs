using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
  public class ProductRepository : IProductRepository
  {
    private readonly DataContext _context;

    public ProductRepository(DataContext context)
    {
      _context = context;
    }


    public async Task<IEnumerable<Product>> GetAllProductsAsync(string sort )
    {   

      


      return await _context.Products.ToListAsync();
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
        var singleProduct = await _context.Products.FindAsync(id);

        return singleProduct;
    }
  }

}