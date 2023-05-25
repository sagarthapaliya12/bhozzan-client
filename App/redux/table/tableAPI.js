import api from "../../helpers/axios";

const getTablesByRestaurant = async (restaurantId) => {
  try {
    const { data } = await api.get(`/table/${restaurantId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const addNewTable = async (table) => {
  try {
    const { data } = await api.post(`/table/add`, table);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const tableService = { getTablesByRestaurant, addNewTable };
export default tableService;
