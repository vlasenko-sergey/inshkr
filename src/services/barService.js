import axios from "axios";

const routes = {
  getIngredients: () => "/bar/ingredients",
  addToBar: (id) => `/item/${id}/add-to-bar`,
  deleteFromBar: (id) => `/item/${id}/remove-from-bar`,
  getCocktails: () => `/bar/cocktails`,
};

export default class BarService {
  static getIngredients() {
    return axios.get(routes.getIngredients());
  }

  static addToBar(id) {
    return axios.put(routes.addToBar(id));
  }

  static deleteFromBar(id) {
    return axios.delete(routes.deleteFromBar(id));
  }

  static getCocktails(id) {
    return axios.get(routes.getCocktails(), { params: { tolerance: 100 } });
  }
}
