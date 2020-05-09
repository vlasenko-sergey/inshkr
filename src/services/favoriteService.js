import axios from "axios";

const routes = {
  getFavorites: () => "/user/favorites",
  addToFavorites: () => "/user/favorites",
  deleteFromFavorites: (id) => `/user/favorites/${id}`,
};

export default class FavoriteService {
  static getFavorites() {
    return axios.get(routes.getFavorites());
  }

  static addToFavorites(id) {
    return axios.post(routes.addToFavorites(), '123');
  }

  static deleteFromFavorites(id) {
    return axios.delete(routes.deleteFromFavorites(id), {});
  }
}
