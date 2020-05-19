import axios from "axios";

const routes = {
  getCocktails: () => "/cocktails",
  searchCocktails: () => "/cocktails/search",
  getCocktailById: (id) => `/cocktails/${id}`,
  getCocktailsProperties: () => "/cocktails/properties",
  createCocktail: () => "/cocktails",
  updateCocktail: (id) => `/cocktails/${id}`,
  deleteCocktail: (id) => `/cocktails/${id}`,
};

export default class CocktailsService {
  static getCocktails() {
    return axios.get(routes.getCocktails());
  }

  static searchCocktails(searchParams) {
    const params = { ...searchParams };
    Object.keys(params).forEach(
      (key) => (params[key] == null || params[key] === "") && delete params[key]
    );
    return axios.get(routes.searchCocktails(), { params });
  }

  static getCocktailById(id) {
    return axios.get(routes.getCocktailById(id));
  }

  static getCocktailsProperties() {
    return axios.get(routes.getCocktailsProperties());
  }

  static createCocktail(cocktail) {
    return axios.post(routes.createCocktail(), cocktail);
  }

  static updateCocktail(cocktail) {
    return axios.put(routes.updateCocktail(cocktail.id), cocktail);
  }

  static deleteCocktail(id) {
    return axios.delete(routes.updateCocktail(id));
  }
}
