import axios from "axios";

const routes = {
  getParties: () => "/user/party",
  getParty: (id) => `/user/party/${id}`,
  createParty: () => "/user/party",
  deleteParty: (id) => `/user/party/${id}`,
  updateParty: (id) => `/user/party/${id}`,
};

export default class PartiesService {
  static getParties() {
    return axios.get(routes.getParties()).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(value);
          }, 1000)
        )
    );
  }

  static getParty(id) {
    return axios.get(routes.getParty(id)).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(value);
          }, 1000)
        )
    );
  }

  static createParty(party) {
    return axios.post(routes.createParty(), party);
  }

  static updateParty(party) {
    return axios.put(routes.updateParty(party.id), party);
  }

  static deleteParty(id) {
    return axios.delete(routes.deleteParty(id), {});
  }
}
