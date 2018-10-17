using RentalCarsAPI.Models.Domain;
using RentalCarsAPI.Models.Request;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace RentalCarsAPI.Services
{
    public class RentalLocationService : IRentalLocationService
    {
        SqlConnection GetConnection()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["RentalCars"].ConnectionString;
            var con = new SqlConnection(connectionString);
            con.Open();

            return con;
        }

        public int CreateRentalLocation(RentalLocationCreateRequest request)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();

                cmd.CommandText = "RentalLocations_Insert";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@LocationName", request.LocationName);
                cmd.Parameters.AddWithValue("@Street", request.Street);
                cmd.Parameters.AddWithValue("@City", request.City);
                cmd.Parameters.AddWithValue("@State", request.State);
                cmd.Parameters.AddWithValue("@Zip", request.Zip);
                cmd.Parameters.AddWithValue("@Phone", request.Phone);
                cmd.Parameters.AddWithValue("@Country", request.Country);
                cmd.Parameters.AddWithValue("@Lat", request.Lat);
                cmd.Parameters.AddWithValue("@Long", request.Long);
                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                return (int)cmd.Parameters["@Id"].Value;
            }
        }

        public List<RentalLocation> GetRentalLocations()
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();

                cmd.CommandText = "RentalLocations_SelectAll";
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    List<RentalLocation> rentalLocations = new List<RentalLocation>();

                    while (reader.Read())
                    {
                        RentalLocation location = new RentalLocation();

                        location.Id = (int)reader["Id"];
                        location.LocationName = (string)reader["LocationName"];
                        location.City = (string)reader["City"];
                        location.DateCreated = (DateTime)reader["DateCreated"];

                        object streetValue = reader["Street"];
                        if (streetValue != DBNull.Value)
                        {
                            location.Street = (string)streetValue;
                        }

                        object stateValue = reader["State"];
                        if (stateValue != DBNull.Value)
                        {
                            location.State = (string)stateValue;
                        }

                        object zipValue = reader["Zip"];
                        if (zipValue != DBNull.Value)
                        {
                            location.Zip = (string)zipValue;
                        }

                        object phoneValue = reader["Phone"];
                        if (phoneValue != DBNull.Value)
                        {
                            location.Phone = (string)phoneValue;
                        }

                        object countryValue = reader["Country"];
                        if (countryValue != DBNull.Value)
                        {
                            location.Country = (string)countryValue;
                        }

                        object latValue = reader["Lat"];
                        if (latValue != DBNull.Value)
                        {
                            location.Lat = (double)latValue;
                        }

                        object longValue = reader["Long"];
                        if (longValue != DBNull.Value)
                        {
                            location.Long = (double)longValue;
                        }

                        object dateModifiedValue = reader["DateModified"];
                        if (dateModifiedValue != DBNull.Value)
                        {
                            location.DateModified = (DateTime)dateModifiedValue;
                        }

                        rentalLocations.Add(location);
                    }

                    return rentalLocations;
                }
            }
        }

        public RentalLocation GetRentalLocation(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();

                cmd.CommandText = "RentalLocations_SelectById";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    if (!reader.Read())
                    {
                        return null;
                    }

                    RentalLocation location = new RentalLocation();

                    location.Id = (int)reader["Id"];
                    location.LocationName = (string)reader["LocationName"];
                    location.City = (string)reader["City"];
                    location.DateCreated = (DateTime)reader["DateCreated"];

                    object streetValue = reader["Street"];
                    if (streetValue != DBNull.Value)
                    {
                        location.Street = (string)streetValue;
                    }

                    object stateValue = reader["State"];
                    if (stateValue != DBNull.Value)
                    {
                        location.State = (string)stateValue;
                    }

                    object zipValue = reader["Zip"];
                    if (zipValue != DBNull.Value)
                    {
                        location.Zip = (string)zipValue;
                    }

                    object phoneValue = reader["Phone"];
                    if (phoneValue != DBNull.Value)
                    {
                        location.Phone = (string)phoneValue;
                    }

                    object countryValue = reader["Country"];
                    if (countryValue != DBNull.Value)
                    {
                        location.Country = (string)countryValue;
                    }

                    object latValue = reader["Lat"];
                    if (latValue != DBNull.Value)
                    {
                        location.Lat = (double)latValue;
                    }

                    object longValue = reader["Long"];
                    if (longValue != DBNull.Value)
                    {
                        location.Long = (double)longValue;
                    }

                    object dateModifiedValue = reader["DateModified"];
                    if (dateModifiedValue != DBNull.Value)
                    {
                        location.DateModified = (DateTime)dateModifiedValue;
                    }

                    return location;
                }
            }
        }

        public void UpdateRentalLocation(RentalLocationUpdateRequest request)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "RentalLocations_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", request.Id);
                cmd.Parameters.AddWithValue("@LocationName", request.LocationName);
                cmd.Parameters.AddWithValue("@Street", request.Street);
                cmd.Parameters.AddWithValue("@City", request.City);
                cmd.Parameters.AddWithValue("@State", request.State);
                cmd.Parameters.AddWithValue("@Zip", request.Zip);
                cmd.Parameters.AddWithValue("@Phone", request.Phone);
                cmd.Parameters.AddWithValue("@Country", request.Country);
                cmd.Parameters.AddWithValue("@Lat", request.Lat);
                cmd.Parameters.AddWithValue("@Long", request.Long);

                cmd.ExecuteNonQuery();
            }
        }

        public void DeleteRentalLocation(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "RentalLocations_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", id);

                cmd.ExecuteNonQuery();
            }
        }
    }
}