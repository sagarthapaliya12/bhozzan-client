import api from "../../helpers/axios";

const getUserDetails = async () => {
  try {
    console.log("DFsdfdsf")
    const { data } = await api.get(`/user/my-details`);
    console.log("API: ", data)
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const customerService = {
  getUserDetails,
};

export default customerService;
