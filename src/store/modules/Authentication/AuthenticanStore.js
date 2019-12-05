import api from "../../api";

const AuthenticationStore = {
  namespaced: true,
  state: {
    auth: {},
    status: "",
    token: sessionStorage.getItem("token") || ""
  },
  getters: {
    authStatus: state => state.status,
    isLoggedIn: state => !!state.token
  },
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state, token, auth) {
      state.status = "authenicated";
      state.auth = auth;
      state.token = token;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, auth) {
      return new Promise((resolve, reject) => {
        commit("authRequest");
        api
          .post("/login", auth)
          .then(response => {
            const token = response.data.token;
            sessionStorage.setItem("token", token);
            api.defaults.auth = auth; // TODO Permantent Solution
            commit("authSuccess", token, auth);
            resolve(response);
          })
          .catch(error => {
            commit("authError");
            sessionStorage.removeItem("token");
            reject(error);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        sessionStorage.removeItem("token");
        api.defaults.auth = {}; // Permanent solution
        resolve();
      });
    }
  }
};

export default AuthenticationStore;
