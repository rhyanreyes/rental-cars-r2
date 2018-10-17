using RentalCarsAPI.Models.Domain;
using RentalCarsAPI.Models.Request;
using RentalCarsAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace RentalCarsAPI.Controllers
{
    [RoutePrefix("api/rentallocation")]
    public class RentalLocationController : ApiController
    {
        readonly IRentalLocationService rentalLocationService;

        public RentalLocationController(IRentalLocationService rentalLocationService)
        {
            this.rentalLocationService = rentalLocationService;
        }

        [Route, HttpPost]
        public HttpResponseMessage PostCreateRentalLocation(RentalLocationCreateRequest rentalLocation)
        {
            if (rentalLocation == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newLocationId = rentalLocationService.CreateRentalLocation(rentalLocation);

            string responseMessage = "New Rental Location ID: " + newLocationId;

            return Request.CreateResponse(HttpStatusCode.OK, responseMessage);
        }

        [Route, HttpGet]
        public HttpResponseMessage GetRentalLocations()
        {
            List<RentalLocation> rentalLocations = rentalLocationService.GetRentalLocations();

            return Request.CreateResponse(HttpStatusCode.OK, rentalLocations);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetRentalLocation(int id)
        {
            RentalLocation location = rentalLocationService.GetRentalLocation(id);

            return Request.CreateResponse(HttpStatusCode.OK, location);
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage PutUpdateRentalLocation(int id, RentalLocationUpdateRequest rentalLocationUpdate)
        {
            if (rentalLocationUpdate == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            else if (id != rentalLocationUpdate.Id)
            {
                ModelState.AddModelError("id", "ID in URL does not match ID in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            rentalLocationService.UpdateRentalLocation(rentalLocationUpdate);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage DeleteRentalLocation(int id)
        {
            rentalLocationService.DeleteRentalLocation(id);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}