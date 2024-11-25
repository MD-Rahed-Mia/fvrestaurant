import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  },
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers = {
    "x-auth-token": process.env.REACT_APP_API_TOKEN,
  };

  return config;
});

export default axiosInstance;
