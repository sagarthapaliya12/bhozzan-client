import api from "../../helpers/axios";

getReservationByTable = async (tableId) => {
  try {
    const { data } = await api.get(`/reservation/table/${tableId}`);
    console.log("sdfsdfsdfs: ", data);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const reservationService = { getReservationByTable };
export default reservationService;
