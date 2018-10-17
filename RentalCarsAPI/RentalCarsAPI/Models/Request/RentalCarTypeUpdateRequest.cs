using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentalCarsAPI.Models.Request
{
    public class RentalCarTypeUpdateRequest : RentalCarTypeCreateRequest
    {
        public int Id { get; set; }
    }
}