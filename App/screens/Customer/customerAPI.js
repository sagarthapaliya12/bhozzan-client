import api from "../../helpers/axios";

const getUserDetails = async () => {
  try {
    const { data } = await api.get(`/user/my-details`);
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

const addFavoriteRestaurant = async (restaurantId) => {
  try {
    const { data } = await api.post(`/user/favorite/${restaurantId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const getFavoriteRestaurant = async () => {
  try {
    const { data } = await api.get(`/user/favorite/`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const removeFavoriteRestaurant = async (restaurantId) => {
  try {
    const { data } = await api.delete(`/user/favorite/${restaurantId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const addToBasket = async (dishId) => {
  try {
    const { data } = await api.post(`/basket/${dishId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const getBasketCount = async () => {
  try {
    const { data } = await api.get(`/basket/count`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const getBasketRestaurants = async () => {
  try {
    const { data } = await api.get(`/basket`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const getBasketDishes = async (restaurantId) => {
  try {
    const { data } = await api.get(`/basket/${restaurantId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const removeBasketDish = async (dishId) => {
  try {
    const { data } = await api.delete(`/basket/${dishId}`);
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

const getTodays = async () => {
  try {
    const { data } = await api.get(`dish/best-selling`);
    console.log("Fw", data)
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const customerService = {
  getUserDetails,
  getRestaurantDetails,
  addFavoriteRestaurant,
  getFavoriteRestaurant,
  removeFavoriteRestaurant,
  addToBasket,
  getBasketCount,
  getBasketRestaurants,
  getBasketDishes,
  removeBasketDish,
  getOrderHistory,
  getTodays,
};

export default customerService;
