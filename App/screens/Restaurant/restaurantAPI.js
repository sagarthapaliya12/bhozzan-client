import api from "../../helpers/axios";

const getAllRestaurants = async () => {
  try {
    const { data } = await api.get(`/restaurant/list`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getRestaurantDetails = async (restaurantId) => {
  try {
    const { data } = await api.get(`/restaurant/${restaurantId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getAllDishes = async () => {
  try {
    const { data } = await api.get(`/dish`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getDishesByRestaurantId = async (restaurantId) => {
  try {
    const { data } = await api.get(`/dish/restaurant/${restaurantId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const restaurantService = {
  getAllRestaurants,
  getRestaurantDetails,
  getAllDishes,
  getDishesByRestaurantId
};

export default restaurantService;
