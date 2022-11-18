import api from "../../helpers/axios";

const getOrders = async (param) => {
  try {
    const uri = param ? `/order/restaurant?status=${param}` : `/order/restaurant`;
    const { data } = await api.get(uri);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getOrderHistory = async () => {
  try {
    const { data } = await api.get(`/order/my-orders`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const placeOrder = async (order) => {
  try {
    const { data } = await api.post(`/order/create`, order);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const orderService = { getOrders, getOrderHistory, placeOrder };
export default orderService;
