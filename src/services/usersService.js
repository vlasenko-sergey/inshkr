import axios from "axios";

const routes = {
  getUsers: () => "/users",
  getUser: () => "/user",
};

export default class UsersService {
  static getUsers() {
    return axios.get(routes.getUsers());
  }

  static getUser() {
    return axios.get(routes.getUser());
  }
}
