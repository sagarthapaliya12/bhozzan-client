import api from "../../helpers/axios";

const loginUser = async (credentials) => {
  try {
    const { data } = await api.post("/user/login", credentials);
    if (!data) throw new Error();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (credentials) => {
  try {
    const { data } = await api.post("/user/register", credentials);
    if (!data) throw new Error();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const registerRestaurant = async (credentials) => {
  try {
    const { data } = await api.post("/restaurant/register", credentials);
    if (!data) throw new Error();
    console.log("Restaurant: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  loginUser,
  registerUser,
  registerRestaurant,
};

export default authService;
