import axios from "axios";
import { getRandomIngredientImage } from "./imageStubs";

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
    return axios.get(routes.getIngredients(), { params }).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              value.map((item) => ({
                ...item,
                imageRef: getRandomIngredientImage(),
              }))
            );
          }, 1000)
        )
    );
  }

  static getIngredientById(id) {
    return axios.get(routes.getIngredientById(id)).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              ...value,
              imageRef: getRandomIngredientImage(),
            });
          }, 1000)
        )
    );
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
