import axios from "axios";

const routes = {
  getFavorites: () => "/cocktails/favorites",
  addToFavorites: (id) => `/cocktails/${id}/add-to-favorites`,
  deleteFromFavorites: (id) => `/cocktails/${id}/remove-from-favorites`,
};

export default class FavoriteService {
  static getFavorites() {
    return axios.get(routes.getFavorites());
  }

  static addToFavorites(id) {
    return axios.put(routes.addToFavorites(id));
  }

  static deleteFromFavorites(id) {
    return axios.delete(routes.deleteFromFavorites(id), {});
  }
}
