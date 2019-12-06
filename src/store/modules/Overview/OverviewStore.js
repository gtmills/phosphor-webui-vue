import api from "../../api";

const OverviewStore = {
  namespaced: true,
  state: {
    serverModel: "--"
  },
  getters: {
    serverModel(state) {
      return state.serverModel;
    }
  },
  mutations: {
    setServerModel(state, serverModel) {
      state.serverModel = serverModel;
    }
  },
  actions: {
    getServerModel({ commit }) {
      api
        .get("/xyz/openbmc_project/inventory/system")
        .then(({ data }) => {
          console.log(data);
          const serverModel = data.data;
          commit("setServerModel", serverModel);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default OverviewStore;

//   "data": {
//       "AssetTag": "",
//       "BuildDate": "",
//       "Cached": false,
//       "FieldReplaceable": false,
//       "Manufacturer": "",
//       "Model": "0000000000000000",
//       "PartNumber": "",
//       "Present": true,
//       "PrettyName": "",
//       "SerialNumber": "0000000000000000"
//   }
