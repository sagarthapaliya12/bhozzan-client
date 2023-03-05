import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

const api = axios.create({
  // baseURL: "http://192.168.1.77:7000",
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

//run before any http request
api.interceptors.request.use(
  async (req) => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const { token } = JSON.parse(user);
      req.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default api;
