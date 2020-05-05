import axios from "axios";

const routes = {
  getIngredients: () => "/user/bar/ingredients",
};

export default class BarService {
  static getIngredients() {
    return axios.get(routes.getIngredients());
  }
}
