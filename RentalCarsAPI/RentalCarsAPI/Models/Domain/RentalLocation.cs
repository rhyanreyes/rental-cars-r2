using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentalCarsAPI.Models.Domain
{
    public class RentalLocation
    {
        public int Id { get; set; }
        public string LocationName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}