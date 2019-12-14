import api from '../../api';

const NetworkSettingsStore = {
  namespaced: true,
  state: {
    networkData: null,
    ipAddress: '--',
    macAddress: '--'
  },
  getters: {
    networkData(state) {
      return state.networkData;
    },
    ipAddress(state) {
      return state.ipAddress;
    },
    macAddress(state) {
      return state.macAddress;
    }
  },
  mutations: {
    setNetworkData(state, networkData) {
      state.networkData = networkData;
    },
    setIpAddress(state, ipAddress) {
      state.ipAddress = ipAddress;
    },
    setMacAddress(state, macAddress) {
      state.macAddress = macAddress;
    }
  },
  actions: {
    getNetworkData({ commit }) {
      api
        .get('/xyz/openbmc_project/network/enumerate')
        .then(({ data }) => {
          const networkData = JSON.stringify(data.data);
          const networkDataContent = JSON.parse(networkData);
          let parsedNetworkData = {
            interface_ids: [],
            interfaces: {},
            ip_addresses: { ipv4: [], ipv6: [] }
          };
          let interfaceId = '',
            keyParts = [],
            interfaceHash = '',
            interfaceType = '';
          for (let key in networkDataContent) {
            if (key.match(/network\/eth\d+(_\d+)?$/gi)) {
              interfaceId = key.split('/').pop();
              if (parsedNetworkData.interface_ids.indexOf(interfaceId) == -1) {
                parsedNetworkData.interface_ids.push(interfaceId);
                parsedNetworkData.interfaces[interfaceId] = {
                  interfaceIname: '',
                  DomainName: '',
                  MACAddress: '',
                  Nameservers: [],
                  DHCPEnabled: 0,
                  ipv4: { ids: [], values: [] },
                  ipv6: { ids: [], values: [] }
                };
                parsedNetworkData.interfaces[interfaceId].MACAddress =
                  networkDataContent[key].MACAddress;
                parsedNetworkData.interfaces[
                  interfaceId
                ].DomainName = networkDataContent[key].DomainName.join(' ');
                parsedNetworkData.interfaces[interfaceId].Nameservers =
                  networkDataContent[key].Nameservers;
                parsedNetworkData.interfaces[interfaceId].DHCPEnabled =
                  networkDataContent[key].DHCPEnabled;
              }
            } else if (
              key.match(/network\/eth\d+(_\d+)?\/ipv[4|6]\/[a-z0-9]+$/gi)
            ) {
              keyParts = key.split('/');
              interfaceHash = keyParts.pop();
              interfaceType = keyParts.pop();
              interfaceId = keyParts.pop();
              if (
                parsedNetworkData.interfaces[interfaceId][
                  interfaceType
                ].ids.indexOf(interfaceHash) == -1
              ) {
                parsedNetworkData.interfaces[interfaceId][
                  interfaceType
                ].ids.push(interfaceHash);
                parsedNetworkData.interfaces[interfaceId][
                  interfaceType
                ].values.push(networkDataContent[key]);
                parsedNetworkData.ip_addresses[interfaceType].push(
                  networkDataContent[key]['Address']
                );
              }
            }
          }
          commit(
            'setMacAddress',
            networkDataContent['/xyz/openbmc_project/network/eth0'].MACAddress
          );
          commit('setIpAddress', parsedNetworkData.ip_addresses.ipv4);
        })
        .catch(error => {
          console.log('Network Data:', error);
        });
    }
  }
};

export default NetworkSettingsStore;
