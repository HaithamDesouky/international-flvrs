using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{


}namespace API.DTOs
{
  public class OrderDto
  {
   
    public string Email { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Country { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Telephone { get; set; }
    public string OrderNotes { get; set; }
    public DateTimeOffset OrderDate {get; set;} = DateTimeOffset.Now;
    public IEnumerable<Product> Products {get; set;}
    public int Total { get; set; }
    public string PaymentIntentId { get; set; }
  }
}