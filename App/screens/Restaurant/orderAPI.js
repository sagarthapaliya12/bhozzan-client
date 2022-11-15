import api from "../../helpers/axios";

const getPendingOrders = async () => {
  try {
    const { data } = await api.get(`/order/restaurant?status=pending`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const orderService = { getPendingOrders };
export default orderService;
