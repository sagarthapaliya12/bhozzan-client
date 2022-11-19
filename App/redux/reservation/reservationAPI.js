import api from "../../helpers/axios";

getReservationByTableCustomer = async (tableId) => {
  try {
    const { data } = await api.get(`/reservation/table/${tableId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

getReservationByTableRestaurant = async (tableId) => {
  try {
    const { data } = await api.get(`/reservation/table/all/${tableId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

createReservation = async (reservationDetail) => {
  try {
    console.log("Fsdfsd", reservationDetail);
    const { data } = await api.post(`/reservation/create`, reservationDetail);
    console.log("Test CREATE: ", data);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const reservationService = { getReservationByTableRestaurant, getReservationByTableCustomer, createReservation };
export default reservationService;
