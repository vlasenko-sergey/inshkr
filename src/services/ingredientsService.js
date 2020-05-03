import axios from "axios";

const routes = {
  getIngredients: () => "/ingredients",
  getIngredientById: (id) => `/ingredients/${id}`,
  getTastes: () => "/ingredients/tastes",
  getSpirits: () => "/ingredients/spirits",
  getGroups: () => "/ingredients/groups",
};

export default class IngredientsService {
  static getIngredients(searchParams) {
    const params = { ...searchParams };
    Object.keys(params).forEach(
      (key) => (params[key] == null || params[key] === "") && delete params[key]
    );
    return axios.get(routes.getIngredients(), { params });
  }

  static getIngredientById(id) {
    return axios.get(routes.getIngredientById(id));
  }

  static getTastes() {
    return axios.get(routes.getTastes());
  }

  static getSpirits() {
    return axios.get(routes.getSpirits());
  }

  static getGroups() {
    return axios.get(routes.getGroups());
  }
}
