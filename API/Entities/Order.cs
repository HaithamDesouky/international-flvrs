using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Order : BaseEntity
    {
    public Order()
    {
    }

    public Order(string email, string address, string city,  string country, string zipcode, string firstName, string lastName, string telephone, string orderNotes, int total)
    {
      Email = email;
      Address = address;
      City = city;
      Country = country;
      Zipcode = zipcode;
      FirstName = firstName;
      LastName = lastName;
      Telephone = telephone;
      OrderNotes = orderNotes;
      Total = total;
            
    }

    public string Email { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string Zipcode { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Telephone { get; set; }
    public string OrderNotes { get; set; }
    public DateTimeOffset OrderDate {get; set;} = DateTimeOffset.Now;
    public int Total { get; set; }

        
    }
}