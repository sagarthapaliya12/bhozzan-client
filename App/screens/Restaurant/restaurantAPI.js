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

const getRestaurantUserId = async () => {
  try {
    const { data } = await api.get(`/user/my-details`);
    return data.user.restaurant;
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

const getDishesByCategory = async (categoryName) => {
  try {
    const { data } = await api.get(`/dish/category/${categoryName}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const addDish = async (dish) => {
  try {
    const { data } = await api.get(`/dish/add`, dish);
    console.log("Add", data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const restaurantService = {
  getAllRestaurants,
  getRestaurantDetails,
  getRestaurantUserId,
  getAllDishes,
  getDishesByRestaurantId,
  getDishesByCategory,
  addDish,
};

export default restaurantService;
