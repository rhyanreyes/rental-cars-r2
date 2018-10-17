using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentalCarsAPI.Models.Request
{
    public class RentalLocationCreateRequest
    {
        public string LocationName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public double? Lat { get; set; }
        public double? Long { get; set; }
    }
}