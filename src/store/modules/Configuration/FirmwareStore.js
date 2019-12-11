import api from "../../api";

const FirmwareStore = {
  namespaced: true,
  state: {
    firmwareInfo: null,
    bmcActiveVersion: "--",
    hostActiveVersion: "--"
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
        .get("/xyz/openbmc_project/software/enumerate")
        .then(({ data }) => {
          const firmwareInfo = data.data;
          const json = JSON.stringify(firmwareInfo);
          const content = JSON.parse(json);

          const functionalImages =
            content["/xyz/openbmc_project/software/functional"].endpoints;

          for (let key in content) {
            if (
              content.hasOwnProperty(key) &&
              content[key].hasOwnProperty("Version")
            ) {
              // If "Functional" activation status is
              // functional, else it is "activation"
              // github.com/openbmc/phosphor-dbus-interfaces/blob/master/xyz/openbmc_project/Software/Activation.interface.yaml
              let activationStatus = "";
              if (content[key].Activation) {
                activationStatus = content[key].Activation.split(".").pop();
              }

              if (functionalImages.includes(key)) {
                activationStatus = "Functional";
              }

              let data = [];
              data.push(
                Object.assign(
                  {
                    path: key,
                    activationStatus: activationStatus,
                    imageId: key.split("/").pop(),
                    data: { key: key, value: content[key] }
                  },
                  content[key]
                )
              );

              // Get BMC and Host active Versions
              const imageType = content[key].Purpose.split(".").pop();
              if (activationStatus == "Functional" && imageType == "BMC") {
                commit("setBmcActiveVersion", content[key].Version);
              }

              if (activationStatus == "Functional" && imageType == "Host") {
                commit("setHostActiveVersion", content[key].Version);
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
