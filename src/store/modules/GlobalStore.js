import api from '../api';

const HOST_STATE = {
  on: 'xyz.openbmc_project.State.Host.HostState.Running',
  off: 'xyz.openbmc_project.State.Host.HostState.Off',
  error: 'xyz.openbmc_project.State.Host.HostState.Quiesced',
  transition: {
    on: 'xyz.openbmc_project.State.Host.Transition.On',
    reboot: 'xyz.openbmc_project.State.Host.Transition.Reboot'
  }
};

const hostStateMapper = hostState => {
  switch (hostState) {
    case HOST_STATE.on:
      return 'Running';
    case HOST_STATE.off:
      return 'Off';
    case HOST_STATE.error:
      return 'Error';
    case HOST_STATE.transition.on:
    case HOST_STATE.transition.reboot:
      return 'Rebooting';
    default:
      return 'Unreachable';
  }
};

const GlobalStore = {
  namespaced: true,
  state: {
    hostName: '--',
    hostStatus: 'Unreachable'
  },
  getters: {
    hostName(state) {
      return state.hostName;
    },
    hostStatus(state) {
      return state.hostStatus;
    }
  },
  mutations: {
    setHostName(state, hostName) {
      state.hostName = hostName;
    },
    setHostStatus(state, hostStatus) {
      state.hostStatus = hostStateMapper(hostStatus);
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
    getHostStatus({ commit }) {
      api
        .get('/xyz/openbmc_project/state/host0/attr/CurrentHostState')
        .then(response => {
          const hostStatus = response.data.data;
          commit('setHostStatus', hostStatus);
        })
        .catch(error => console.log(error));
    }
  }
};

export default GlobalStore;
