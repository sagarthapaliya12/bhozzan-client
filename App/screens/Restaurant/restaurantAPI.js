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

const updateRestaurantDetails = async (restaurantDetails) => {
  try {
    const { data } = await api.put(`/restaurant/update`, restaurantDetails);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
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

const getRestaurantRating = async (restaurantId) => {
  try {
    const { data } = await api.get(`/restaurant/ratings/${restaurantId}`);
    return data;
  } catch (error) {
    console.log("Sdfsd", error.response.data);
    throw new Error(error.response.data.error);
  }
};

const rateRestaurant = async (detail) => {
  try {
    const { data } = await api.post(`/user/rate`, detail);
    console.log("Success", data);
    return data;
  } catch (error) {
    console.log("RaTE Restaurant Error", error.response.data);
    throw new Error(error.response.data.error);
  }
};

const restaurantService = {
  getAllRestaurants,
  getUnverifiedRestaurants,
  getRestaurantDetails,
  updateRestaurantDetails,
  getRestaurantUserId,
  getAllDishes,
  getDishesByRestaurantId,
  getDishesByCategory,
  addDish,
  updateDish,
  verifyRestaurant,
  refuteRestaurant,
  getRestaurantRating,
  rateRestaurant,
};

export default restaurantService;
