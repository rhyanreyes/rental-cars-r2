using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentalCarsAPI.Models.Request
{
    public class RentalCarCreateRequest
    {
        public string Make {get;set;}
        public string Model { get; set; }
        public int? Year { get; set; }
        public int? CarType { get; set; }
        public string VIN { get; set; }
        public string Color { get; set; }
    }
}