import axios from "react-native-axios";
import { SERVER_BASE_URL } from "@env";

const api = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Run before sening any request
// api.interceptors.request.use(
//   (req) => {
//     const user = JSON.stringify({
//       token:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6OTgyMTk1ODgyNSwiaWQiOiI2MzA2ZmRlN2MyZDFlODJiMmQ5MTkwM2EiLCJpYXQiOjE2NjI2MjU5NzYsImV4cCI6MTY2MzIzMDc3Nn0.U7ky0QCqzAG41ZsiFDs2yVtYSpQsf2jH-c7EnjodCuo",
//     });
//     if (user) {
//       const { token } = JSON.parse(user);
//       req.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//     return req;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
