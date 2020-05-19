import axios from "axios";

const routes = {
  getItems: () => "/items",
  searchItems: () => "/items/search",
  getIngredientById: (id) => `/ingredients/${id}`,
  createIngredient: () => `/ingredients`,
  updateIngredient: (id) => `/ingredients/${id}`,
  deleteIngredient: (id) => `/ingredients/${id}`,
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

  static createIngredient(ingredient) {
    return axios.post(routes.createIngredient(), ingredient);
  }

  static updateIngredient(ingredient) {
    return axios.put(routes.updateIngredient(ingredient.id), ingredient);
  }

  static deleteIngredient(id) {
    return axios.delete(routes.deleteIngredient(id));
  }
}
