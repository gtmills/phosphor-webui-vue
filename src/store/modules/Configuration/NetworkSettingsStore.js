import api from '../../api';

const NetworkSettingsStore = {
  namespaced: true,
  state: {
    networkData: null
  },
  getters: {
    networkData(state) {
      return state.networkData;
    }
  },
  mutations: {
    setNetworkData(state, networkData) {
      state.networkData = networkData;
    }
  },
  actions: {
    getNetworkData({ commit }) {
      api
        .get('/xyz/openbmc_project/network/enumerate')
        .then(({ data }) => {
          const networkData = JSON.stringify(data.data);
          const networkDataContent = JSON.parse(networkData);

          console.log('network data', networkDataContent);

          // TODO: Parse network data to get MAC and IP addresses
          commit(
            'setNetworkData',
            networkDataContent['/xyz/openbmc_project/network/eth0'].MACAddress
          );
        })
        .catch(error => {
          console.log('Network Data:', error);
        });
    }
  }
};

export default NetworkSettingsStore;
