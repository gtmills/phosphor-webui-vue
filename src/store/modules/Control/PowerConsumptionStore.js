import api from '../../api';

const PowerConsumptionStore = {
  namespaced: true,
  state: {
    powerData: null,
    powerConsumption: '--'
  },
  getters: {
    powerData(state) {
      return state.powerData;
    },
    powerConsumption(state) {
      return state.powerConsumption;
    }
  },
  mutations: {
    setPowerData(state, powerData) {
      state.powerData = powerData;
    },
    setPowerConsumption(state, powerConsumption) {
      state.powerConsumption = powerConsumption;
    }
  },
  actions: {
    getPowerData({ commit }) {
      api
        .get('/xyz/openbmc_project/sensors/power/total_power')
        .then(({ data }) => {
          const powerData = data.data;
          let powerConsumption =
            powerData.Value * Math.pow(10, powerData.Scale) + ' W';
          commit('setPowerConsumption', powerConsumption);
        })
        .catch(error => {
          console.log('Power Consumption', error);
          commit('setPowerConsumption', 'Not available');
        });
    }
  }
};

export default PowerConsumptionStore;
