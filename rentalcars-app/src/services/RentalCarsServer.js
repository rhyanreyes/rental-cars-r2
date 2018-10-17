import axios from "axios";

// "http://localhost:59435"

export function addRentalCarPost(rentalCar) {
  const url = `/api/rentalcars`;

  return axios.post(url, rentalCar);
}

export function listRentalCarsGet() {
  const url = `/api/rentalcars`;

  return axios.get(url);
}

export function loadRentalCarGet(carId) {
  const url = `/api/rentalcars/${carId}`;

  return axios.get(url);
}

export function updateRentalCarPut(rentalCar) {
  const url = `/api/rentalcars/${rentalCar.Id}`;

  return axios.put(url, rentalCar);
}

export function removeRentalCarDelete(carId) {
  const url = `/api/rentalcars/${carId}`;

  return axios.delete(url);
}

export function listRentalCarTypesGet() {
  const url = `/api/rentalcars/cartype`;

  return axios.get(url);
}

export function addRentalCarTypePost(carType) {
  const url = `/api/rentalcars/cartype`;

  return axios.post(url, carType);
}

export function updateRentalCarTypePut(carType) {
  const url = `/api/rentalcars/cartype/${carType.id}`;

  return axios.put(url, carType);
}

export function createRentalLocationPost(locationObj) {
  const url = `/api/rentallocation`;

  return axios.post(url, locationObj);
}

export function listRentalLocationsGet() {
  const url = `/api/rentallocation`;

  return axios.get(url);
}

export function listRentalLocationGet(id) {
  const url = `/api/rentallocation/${id}`;

  return axios.get(url);
}

export function updateRentalLocationPut(id, locationObj) {
  const url = `/api/rentallocation/${id}`;

  return axios.put(url, locationObj);
}

export function removeRentalLocationDelete(id) {
  const url = `/api/rentallocation/${id}`;

  return axios.delete(url);
}
