import api from "../../helpers/axios";

const getReservationByTableCustomer = async (tableId) => {
  try {
    const { data } = await api.get(`/reservation/table/${tableId}`);
    // console.log("dsad", data);
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

const getMyReservation = async () => {
  try {
    const { data } = await api.get(`/reservation/my`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const createReservation = async (reservationDetail) => {
  try {
    // console.log("fdf", reservationDetail)
    const { data } = await api.post(`/reservation/create`, reservationDetail);
    console.log("fdf", data);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const reservationService = {
  getReservationByTableRestaurant,
  getReservationByTableCustomer,
  getMyReservation,
  createReservation,
};
export default reservationService;
