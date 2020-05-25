import axios from "axios";
import qs from "qs";

const configureAxios = () => {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "production" ? `http://${window.location.hostname}:8080/` : "";

  axios.interceptors.response.use(
    (response) =>
      new Promise((resolve) => setTimeout(() => resolve(response.data), 500)),
    (error) => {
      return Promise.reject(error.response.data);
    }
  );
  axios.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  };
};

export default configureAxios;
