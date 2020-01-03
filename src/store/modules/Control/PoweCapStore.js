import api from '../../api';

const PowerCapStore = {
  namespaced: true,
  state: {
    powerCapData: null,
    powerCapValue: 'Not enabled'
  },
  getters: {
    powerCapData(state) {
      return state.powerCapData;
    },
    powerCapValue(state) {
      return state.powerCapValue;
    }
  },
  mutations: {
    setPowerCapData(state, powerCapData) {
      state.powerCapData = powerCapData;
    },
    setPowerCapValue(state, powerCapValue) {
      state.powerCapValue = powerCapValue;
    }
  },
  actions: {
    getPowerCapData({ commit }) {
      api
        .get('/xyz/openbmc_project/control/host0/power_cap')
        .then(({ data }) => {
          const powerCapData = data.data;

          if (powerCapData.PowerCapEnable) {
            commit('setPowerCapValue', powerCapData.PowerCap + ' W');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default PowerCapStore;