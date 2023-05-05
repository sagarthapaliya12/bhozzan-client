import api from "../../helpers/axios";

const placeOrder = async (order) => {
  try {
    const { data } = await api.post(`/order/create`, order);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
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

const getOrders = async (param) => {
  try {
    const uri = param ? `/order/restaurant?status=${param}` : `/order/restaurant`;
    const { data } = await api.get(uri);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const acceptOrder = async (orderId) => {
  try {
    const { data } = await api.put(`/order/accept/${orderId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const rejectOrder = async (orderId) => {
  try {
    const { data } = await api.put(`/order/reject/${orderId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const dispatchOrder = async (orderId) => {
  try {
    const { data } = await api.put(`/order/dispatch/${orderId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const serveOrder = async (orderId) => {
  try {
    const { data } = await api.put(`/order/serve/${orderId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const deliverOrder = async (orderId) => {
  try {
    const { data } = await api.put(`/order/deliver/${orderId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const orderService = {
  placeOrder,
  getOrderHistory,
  getOrders,
  acceptOrder,
  rejectOrder,
  dispatchOrder,
  serveOrder,
  deliverOrder,
};
export default orderService;
