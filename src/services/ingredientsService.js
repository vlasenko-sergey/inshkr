import axios from "axios";

const routes = {
  getItems: () => "/items",
  searchItems: () => "/items/search",
  getIngredientById: (id) => `/items/${id}`,
  getItemProperties: () => "/items/properties",
};

export default class IngredientsService {
  static getItems() {
    return axios.get(routes.getItems());
  }

  static searchItems(searchParams) {
    const params = { ...searchParams };
    Object.keys(params).forEach(
      (key) => (params[key] == null || params[key] === "") && delete params[key]
    );
    return axios.get(routes.searchItems(), { params }).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(value);
          }, 1000)
        )
    );
  }

  static getIngredientById(id) {
    return axios.get(routes.getIngredientById(id));
  }

  static getItemProperties() {
    return axios.get(routes.getItemProperties());
  }
}
