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
    [RoutePrefix("api/rentalcars")]
    public class RentalCarsController : ApiController
    {
        readonly IRentalCarsService rentalCarsService;
        readonly IRentalLocationService rentalLocationService;

        public RentalCarsController(IRentalCarsService rentalCarsService, IRentalLocationService rentalLocationService)
        {
            this.rentalCarsService = rentalCarsService;
            this.rentalLocationService = rentalLocationService;
        }

        [Route, HttpPost]
        public HttpResponseMessage PostCreateRentalCar(RentalCarCreateRequest rentalCar)
        {
            if (rentalCar == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newRentalCarId = rentalCarsService.CreateRentalCar(rentalCar);

            string responseString = "New Rental Car ID: " + newRentalCarId;

            return Request.CreateResponse(HttpStatusCode.OK, responseString);
        }

        [Route, HttpGet]
        public HttpResponseMessage GetRentalCars()
        {
            List<RentalCar> rentalCars = rentalCarsService.GetAllRentalCars();

            return Request.CreateResponse(HttpStatusCode.OK, rentalCars);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetRentalCarById(int id)
        {
            RentalCar rentalCar = rentalCarsService.GetRentalCarById(id);

            return Request.CreateResponse(HttpStatusCode.OK, rentalCar);
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage PutUpdateRentalCar(int id, RentalCarUpdateRequest updateRequest)
        {
            if (updateRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            else if (id != updateRequest.Id)
            {
                ModelState.AddModelError("id", "ID in URL does not match ID in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            rentalCarsService.UpdateRentalCar(updateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage DeleteRentalCar(int id)
        {
            rentalCarsService.DeleteRentalCar(id);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("cartype"), HttpPost]
        public HttpResponseMessage PostCreateCarType(RentalCarTypeCreateRequest rentalCarType)
        {
            if (rentalCarType == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newCarTypeId = rentalCarsService.CreateCarType(rentalCarType);

            string statusMessage = "New Rental Car Type ID: " + newCarTypeId;

            return Request.CreateResponse(HttpStatusCode.OK, statusMessage);
        }

        [Route("cartype"), HttpGet]
        public HttpResponseMessage GetCarTypes()
        {
            List<CarTypeM> carTypes = rentalCarsService.GetCarTypes();

            return Request.CreateResponse(HttpStatusCode.OK, carTypes);
        }

        [Route("cartype/{id:int}"), HttpPut]
        public HttpResponseMessage UpdateCarType(int id, RentalCarTypeUpdateRequest carTypeUpdateRequest)
        {
            if (carTypeUpdateRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            else if (id != carTypeUpdateRequest.Id)
            {
                ModelState.AddModelError("id", "ID in URL does not match ID in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            rentalCarsService.UpdateCarType(carTypeUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("cartype/{id:int}"), HttpDelete]
        public HttpResponseMessage DeleteCarType(int id)
        {
            rentalCarsService.DeleteCarType(id);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}