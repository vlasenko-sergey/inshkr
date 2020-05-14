import axios from "axios";

const routes = {
  login: () => "/login",
};

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
  },
};

export default class AuthService {
  static login(username, password) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return axios.post(routes.login(), params, config);
  }
}
