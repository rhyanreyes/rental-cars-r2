using System.Collections.Generic;
using RentalCarsAPI.Models.Domain;
using RentalCarsAPI.Models.Request;

namespace RentalCarsAPI.Services
{
    public interface IRentalLocationService
    {
        int CreateRentalLocation(RentalLocationCreateRequest request);
        void DeleteRentalLocation(int id);
        List<RentalLocation> GetRentalLocations();
        RentalLocation GetRentalLocation(int id);
        void UpdateRentalLocation(RentalLocationUpdateRequest request);
    }
}