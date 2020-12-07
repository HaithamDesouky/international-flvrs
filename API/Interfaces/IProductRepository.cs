using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync (int id);
    

        Task<IEnumerable<Product>> GetAllProductsAsync(string sort );
      
        
    }
}