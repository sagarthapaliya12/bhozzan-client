import { useLinkBuilder } from "@react-navigation/native";
import api from "../../helpers/axios";

const getAllRestaurants = async () => {
  try {
    const { data } = await api.get(`/restaurant/list`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getUnverifiedRestaurants = async () => {
  try {
    const { data } = await api.get(`/restaurant/list/unverified`);
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
    const { data } = await api.post(`/dish/add`, dish);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const updateDish = async (update) => {
  try {
    const { data } = await api.put(`/dish/update/${update.id}`, update.dish);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
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

const verifyRestaurant = async (restaurantId) => {
  try {
    const { data } = await api.put(`/restaurant/verify/${restaurantId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const refuteRestaurant = async (restaurantId) => {
  try {
    const { data } = await api.put(`/restaurant/refute/${restaurantId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const restaurantService = {
  getAllRestaurants,
  getUnverifiedRestaurants,
  getRestaurantDetails,
  getRestaurantUserId,
  getAllDishes,
  getDishesByRestaurantId,
  getDishesByCategory,
  addDish,
  updateDish,
  addNewTable,
  verifyRestaurant,
  refuteRestaurant,
};

export default restaurantService;
