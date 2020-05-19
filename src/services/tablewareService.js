import axios from "axios";

const routes = {
  getTablewareById: (id) => `/tableware/${id}`,
  createTableware: () => `/tableware`,
  updateTableware: (id) => `/tableware/${id}`,
  deleteTableware: (id) => `/tableware/${id}`,
};

export default class TablewaresService {
  static getTablewareById(id) {
    return axios.get(routes.getTablewareById(id));
  }

  static createTableware(tableware) {
    return axios.post(routes.createTableware(), tableware);
  }

  static updateTableware(tableware) {
    return axios.put(routes.updateTableware(tableware.id), tableware);
  }

  static deleteTableware(id) {
    return axios.delete(routes.deleteTableware(id));
  }
}
