import axios from "axios";

const routes = {
  getCocktails: () => "/cocktails",
  searchCocktails: () => "/cocktails/search",
  getCocktailById: (id) => `/cocktails/${id}`,
  getCocktailsProperties: () => "/cocktails/properties",
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
}
