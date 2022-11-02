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
    console.log("Test: ", restaurantId)
    const { data } = await api.post(`/user/favorite/${restaurantId}`);
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const customerService = {
  getUserDetails,
  getRestaurantDetails,
  addFavoriteRestaurant,
};

export default customerService;
