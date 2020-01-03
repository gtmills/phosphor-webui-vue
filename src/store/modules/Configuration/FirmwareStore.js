import api from '../../api';

const FirmwareStore = {
  namespaced: true,
  state: {
    firmwareInfo: null,
    bmcActiveVersion: '--',
    hostActiveVersion: '--'
  },
  getters: {
    firmwareInfo(state) {
      return state.firmwareInfo;
    },
    bmcActiveVersion(state) {
      return state.bmcActiveVersion;
    },
    hostActiveVersion(state) {
      return state.hostActiveVersion;
    }
  },
  mutations: {
    setFirmwareInfo(state, firmwareInfo) {
      state.firmwareInfo = firmwareInfo;
    },
    setBmcActiveVersion(state, bmcActiveVersion) {
      state.bmcActiveVersion = bmcActiveVersion;
    },
    setHostActiveVersion(state, hostActiveVersion) {
      state.hostActiveVersion = hostActiveVersion;
    }
  },
  actions: {
    getFirmwareInfo({ commit }) {
      api
        .get('/xyz/openbmc_project/software/enumerate')
        .then(response => {
          const firmwareInfo = response.data.data;
          const functionalImages =
            firmwareInfo['/xyz/openbmc_project/software/functional'].endpoints;
          for (let key in firmwareInfo) {
            if (firmwareInfo[key].hasOwnProperty('Version')) {
              // If "Functional" activation status is
              // functional, else it is "activation"
              // github.com/openbmc/phosphor-dbus-interfaces/blob/master/xyz/openbmc_project/Software/Activation.interface.yaml
              let activationStatus = '';
              if (firmwareInfo[key].Activation) {
                activationStatus = firmwareInfo[key].Activation.split(
                  '.'
                ).pop();
              }
              if (functionalImages.includes(key)) {
                activationStatus = 'Functional';
              }
              // Get BMC and Host active Versions
              const imageType = firmwareInfo[key].Purpose.split('.').pop();
              if (activationStatus == 'Functional' && imageType == 'BMC') {
                commit('setBmcActiveVersion', firmwareInfo[key].Version);
              }
              if (activationStatus == 'Functional' && imageType == 'Host') {
                commit('setHostActiveVersion', firmwareInfo[key].Version);
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default FirmwareStore;
