import axios from "axios";

const routes = {
  getGarnishById: (id) => `/garnish/${id}`,
  createGarnish: () => `/garnish`,
  updateGarnish: (id) => `/garnish/${id}`,
  deleteGarnish: (id) => `/garnish/${id}`,
};

export default class GarnishService {
  static getGarnishById(id) {
    return axios.get(routes.getGarnishById(id));
  }

  static createGarnish(garnish) {
    return axios.post(routes.createGarnish(), garnish);
  }

  static updateGarnish(garnish) {
    return axios.put(routes.updateGarnish(garnish.id), garnish);
  }

  static deleteGarnish(id) {
    return axios.delete(routes.deleteGarnish(id));
  }
}
