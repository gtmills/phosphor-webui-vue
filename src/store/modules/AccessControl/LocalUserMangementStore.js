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
      // Make API call here, faking async call with timeout
      setTimeout(() => {
        const users = [
          { UserName: "root", Role: "Admin", status: "Enabled" },
          { UserName: "user1", Role: "user", status: "Enabled" }
        ];
        commit("setUsers", users);
      }, 3000);
    }
  }
};

export default LocalUserManagementStore;
