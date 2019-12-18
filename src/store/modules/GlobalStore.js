import api from '../api';

const GlobalStore = {
  namespaced: true,
  state: {
    hostName: '--',
    hostStatus: null,
    bmcTime: '--'
  },
  getters: {
    hostName(state) {
      return state.hostName;
    },
    hostStatus(state) {
      return state.hostStatus;
    },
    bmcTime(state) {
      return state.bmcTime;
    }
  },
  mutations: {
    setHostName(state, hostName) {
      state.hostName = hostName;
    },
    setBmcTime(state, bmcTime) {
      state.bmcTime = bmcTime;
    }
  },
  actions: {
    getHostName({ commit }) {
      api
        .get('/xyz/openbmc_project/network/config/attr/HostName')
        .then(response => {
          const hostName = response.data.data;
          commit('setHostName', hostName);
        })
        .catch(error => console.log(error));
    },
    getBmcTime({ commit }) {
      api
        .get('/xyz/openbmc_project/time/bmc')
        .then(response => {
          const bmcTime = response.data.data.Elapsed / 1000;
          commit('setBmcTime', bmcTime);
        })
        .catch(error => console.log(error));
    }
  }
};

export default GlobalStore;
