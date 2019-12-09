import api from "../../api";

const OverviewStore = {
  namespaced: true,
  state: {
    serverInfo: "N/A"
  },
  getters: {
    serverInfo(state) {
      return state.serverInfo;
    }
  },
  mutations: {
    setServerInfo(state, serverInfo) {
      state.serverInfo = serverInfo;
    }
  },
  actions: {
    getServerInfo({ commit }) {
      api
        .get("/xyz/openbmc_project/inventory/system")
        .then(({ data }) => {
          console.log(data);
          const serverInfo = data.data;
          commit("setServerInfo", serverInfo);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default OverviewStore;
