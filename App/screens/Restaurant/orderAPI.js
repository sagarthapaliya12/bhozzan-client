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
    console.log(orderId);
    const { data } = await api.put(`/order/accept/${orderId}`);
    console.log("accepted", data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const rejectOrder = async (orderId) => {
  try {
    console.log(orderId);
    const { data } = await api.put(`/order/reject/${orderId}`);
    console.log("rejected", data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const dispatchOrder = async (orderId) => {
  try {
    console.log(orderId);
    const { data } = await api.put(`/order/dispatch/${orderId}`);
    console.log("dispatched", data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const serveOrder = async (orderId) => {
  try {
    console.log(orderId);
    const { data } = await api.put(`/order/serve/${orderId}`);
    console.log("served", data);
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
};
export default orderService;
