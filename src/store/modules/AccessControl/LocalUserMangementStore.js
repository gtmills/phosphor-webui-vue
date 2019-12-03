import Axios from "axios";
Axios.defaults.auth = {};
Axios.defaults.auth.username = process.env.VUE_APP_USERNAME;
Axios.defaults.auth.password = process.env.VUE_APP_PASSWORD;

const LocalUserManagementStore = {
  namespaced: true,
  state: {
    allUsers: []
  },
  getters: {
    allUsers(state) {
      return state.allUsers;
    }
  },
  mutations: {
    setUsers(state, allUsers) {
      state.allUsers = allUsers;
    }
  },
  actions: {
    getUsers({ commit }) {
      Axios.get("/redfish/v1/AccountService/Accounts")
        .then(response => {
          return response.data.Members.map(user => user["@odata.id"]);
        })
        .then(userIds => {
          return Axios.all(userIds.map(user => Axios.get(user)));
        })
        .then(users => {
          const userData = users.map(user => user.data);
          commit("setUsers", userData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default LocalUserManagementStore;
