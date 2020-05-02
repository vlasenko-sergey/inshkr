import axios from "axios";

const configureAxios = () => {
  axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
      return Promise.reject(error.response.data);
    }
  );
};

export default configureAxios;
