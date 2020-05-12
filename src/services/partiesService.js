import axios from "axios";

const routes = {
  getParties: () => "/user/party",
  getParty: (id) => `/user/party/${id}`,
  createParty: () => "/user/party",
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
}
