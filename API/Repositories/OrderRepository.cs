using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories
{
  public class OrderRepository : IOrderService
  {
        private readonly DataContext _context;
        public OrderRepository(DataContext context)
        {
            _context = context;
        }

        
    public async Task<Order> CreateOrder(Order orderReceived)

    
    {  
      

      var orderToSave =  new Order(orderReceived.Email, orderReceived.Address, orderReceived.City,  orderReceived.Country, orderReceived.Zipcode, orderReceived.FirstName, orderReceived.LastName, orderReceived.Telephone, orderReceived.OrderNotes,  orderReceived.Total);

      await _context.Orders.AddAsync(orderToSave);

      await _context.SaveChangesAsync();
     
     return orderToSave;
    }
  }
}