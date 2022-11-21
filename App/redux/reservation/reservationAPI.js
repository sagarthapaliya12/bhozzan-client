import api from "../../helpers/axios";

const getReservationByTableCustomer = async (tableId) => {
  try {
    const { data } = await api.get(`/reservation/table/${tableId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const getReservationByTableRestaurant = async (tableId) => {
  try {
    const { data } = await api.get(`/reservation/table/all/${tableId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const createReservation = async (reservationDetail) => {
  try {
    const { data } = await api.post(`/reservation/create`, reservationDetail);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const reservationService = {
  getReservationByTableRestaurant,
  getReservationByTableCustomer,
  createReservation,
};
export default reservationService;
