import axios from "axios";
import { getRandomCocktailImage } from "./imageStubs";

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
    return axios.get(routes.getCocktails(), { params }).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              value.map((item) => ({
                ...item,
                imageRef: getRandomCocktailImage(),
              }))
            );
          }, 1000)
        )
    );
  }

  static getCocktailById(id) {
    return axios.get(routes.getCocktailById(id)).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              ...value,
              imageRef: getRandomCocktailImage(),
            });
          }, 1000)
        )
    );
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
