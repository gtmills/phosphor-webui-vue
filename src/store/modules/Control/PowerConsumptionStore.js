import api from "../../api";

const PowerConsumptionStore = {
  namespaced: true,
  state: {
    powerData: "--"
  },
  getters: {
    powerData(state) {
      return state.powerData;
    }
  },
  mutations: {
    setPowerData(state, powerData) {
      state.powerData = powerData;
    }
  },
  actions: {
    getPowerData({ commit }) {
      api
        .get("/xyz/openbmc_project/sensors/power/total_power")
        .then(({ data }) => {
          const powerData = data.data;
          console.log(powerData.Value);

          commit("getPowerData", powerData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default PowerConsumptionStore;
