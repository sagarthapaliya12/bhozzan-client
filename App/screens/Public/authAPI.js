import api from "../../helpers/axios";

const loginUser = async (credentials) => {
  try {
    const { data } = await api.post("/user/login", credentials);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const registerUser = async (credentials) => {
  try {
    const { data } = await api.post("/user/register", credentials);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const registerRestaurant = async (credentials) => {
  try {
    const { data } = await api.post("/restaurant/register", credentials);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const authService = {
  loginUser,
  registerUser,
  registerRestaurant,
};

export default authService;
