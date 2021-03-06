import axios from "axios";

const routes = {
  getParties: () => "/party",
  getParty: (id) => `/party/${id}`,
  createParty: () => "/party",
  deleteParty: (id) => `/party/${id}`,
  updateParty: (id) => `/party/${id}`,
  invite: (partyId) => `/party/${partyId}/invite`,
  dismiss: (partyId) => `/party/${partyId}/dismiss`,
  leave: (partyId) => `/party/${partyId}/leave`,
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
    return axios.post(routes.createParty(), party).then(
      (value) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(value);
          }, 1000)
        )
    );
  }

  static updateParty(party) {
    return axios.put(routes.updateParty(party.id), party);
  }

  static deleteParty(id) {
    return axios.delete(routes.deleteParty(id), {});
  }

  static invite(partyId, userId) {
    return axios.put(routes.invite(partyId), { id: userId });
  }

  static dismiss(partyId, userId) {
    return axios.put(routes.dismiss(partyId), { id: userId });
  }

  static leave(partyId) {
    return axios.put(routes.leave(partyId));
  }
}
