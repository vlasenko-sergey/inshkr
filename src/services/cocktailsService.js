import axios from "axios";

const routes = {
  getCocktails: () => "/cocktails",
};

export default class CocktailsService {
  static getCocktails() {
    return axios.get(routes.getCocktails());
  }
}
