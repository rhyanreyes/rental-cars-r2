using System.Collections.Generic;
using RentalCarsAPI.Models.Domain;
using RentalCarsAPI.Models.Request;

namespace RentalCarsAPI.Services
{
    public interface IRentalCarsService
    {
        int CreateCarType(RentalCarTypeCreateRequest request);
        int CreateRentalCar(RentalCarCreateRequest request);
        void DeleteCarType(int id);
        void DeleteRentalCar(int id);
        List<RentalCar> GetAllRentalCars();
        List<CarTypeM> GetCarTypes();
        RentalCar GetRentalCarById(int id);
        void UpdateCarType(RentalCarTypeUpdateRequest request);
        void UpdateRentalCar(RentalCarUpdateRequest request);
    }
}