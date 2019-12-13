import api from '../../api';

const EventLogStore = {
  namespaced: true,
  state: {
    eventLogData: null
  },
  getters: {
    eventLogData(state) {
      return state.eventLogData;
    }
  },
  mutations: {
    setEventLogData(state, eventLogData) {
      state.eventLogData = eventLogData;
    }
  },
  actions: {
    getEventLogData({ commit }) {
      api
        .get('/xyz/openbmc_project/logging/enumerate')
        .then(({ data }) => {
          const eventLogData = JSON.stringify(data.data);

          console.log('event log data', eventLogData);

          // TODO: Parse event log data for events
          commit('setEventLogData', eventLogData);
        })
        .catch(error => {
          console.log('Event Log Data:', error);
        });
    }
  }
};

export default EventLogStore;
