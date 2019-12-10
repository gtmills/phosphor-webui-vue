import api from "../../api";

const AuthenticationStore = {
  namespaced: true,
  state: {
    status: "",
    cookie: document.cookie
  },
  getters: {
    authStatus: state => state.status,
    isLoggedIn: state => !!state.cookie
  },
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state) {
      state.status = "authenticated";
      state.cookie = document.cookie;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
    }
  },
  actions: {
    login({ commit }, auth) {
      commit("authRequest");
      return api
        .post("/login", { data: auth })
        .then(() => commit("authSuccess"))
        .catch(error => {
          commit("authError");
          throw new Error(error);
        });
    },
    logout({ commit }) {
      commit("logout");
    }
  }
};

export default AuthenticationStore;
