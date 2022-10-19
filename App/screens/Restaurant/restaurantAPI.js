import api from "../../helpers/axios";

const getAllDishes = async () => {
  try {
    const { data } = await api.get(`/dish`);
    console.log("jnj: ", data)
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const restaurantService = {
  getAllDishes,
};

export default restaurantService;
