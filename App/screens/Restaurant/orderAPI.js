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

const orderService = { getOrders };
export default orderService;
