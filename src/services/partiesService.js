import axios from "axios";

const routes = {
  getParties: () => "/user/party",
  getParty: (id) => `/user/party/${id}`,
  createParty: () => "/user/party",
};

export default class PartiesService {
  static getParties() {
    return axios.get(routes.getParties());
  }

  static getParty(id) {
    return axios.get(routes.getParty(id));
  }

  static createParty(party) {
    return axios.post(routes.createParty(), party);
  }
}
