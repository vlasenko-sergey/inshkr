import axios from "axios";

const routes = {
  getCustomCocktails: () => "/user/cocktails",
  getCustomCocktail: (id) => `/user/cocktails/${id}`,
  addCustomCocktail: () => "/user/cocktails",
  updateCustomCocktail: (id) => `/user/cocktails/${id}`,
  deleteCustomCocktail: (id) => `/user/cocktails/${id}`,
};

export default class CustomCocktailsService {
  static getCustomCocktails() {
    return axios.get(routes.getCustomCocktails());
  }

  static getCustomCocktail(id) {
    return axios.get(routes.getCustomCocktail(id));
  }

  static addCustomCocktail(cocktail) {
    return axios.post(routes.addCustomCocktail(), cocktail);
  }

  static updateCustomCocktail(cocktail) {
    return axios.put(routes.updateCustomCocktail(cocktail.id), cocktail);
  }

  static deleteCustomCocktail(cocktail) {
    return axios.delete(routes.deleteCustomCocktail(cocktail.id));
  }
}
