import axios from "axios";

const routes = {
  getCocktails: () => "/cocktails",
  getCocktailById: (id) => `/cocktails/${id}`,
  getBases: () => "/cocktails/bases",
  getTastes: () => "/cocktails/tastes",
  getSpirits: () => "/cocktails/spirits",
  getGroups: () => "/cocktails/groups",
};

export default class CocktailsService {
  static getCocktails(searchParams) {
    const params = { ...searchParams };
    Object.keys(params).forEach(
      (key) => (params[key] == null || params[key] === "") && delete params[key]
    );
    return axios.get(routes.getCocktails(), { params });
  }

  static getCocktailById(id) {
    return axios.get(routes.getCocktailById(id));
  }

  static getBases() {
    return axios.get(routes.getBases());
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
