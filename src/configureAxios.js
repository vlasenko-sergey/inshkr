import axios from "axios";
import qs from "qs";

const configureAxios = () => {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
      ? `http://${window.location.hostname}:8080/`
      : "";

  axios.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return new Promise((resolve) => resolve(response.data));
    },
    (error) => {
      if (["/login", "/login?logout"].some((url) => error.config.url === url)) {
        window.location.href = window.location.hostname;
      }
      return Promise.reject(error.response?.data);
    }
  );
  axios.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  };
};

export default configureAxios;
