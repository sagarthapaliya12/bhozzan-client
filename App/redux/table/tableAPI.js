import api from "../../helpers/axios";

const getTablesByRestaurant = async (restaurantId) => {
  try {
    const { data } = await api.get(`/table/${restaurantId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const tableService = { getTablesByRestaurant };
export default tableService;
