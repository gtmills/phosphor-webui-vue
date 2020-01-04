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
          const eventLog = data.data;
          const eventLogData = [];
          const severityFlags = {
            low: false,
            medium: false,
            high: false
          };
          const severityToPriorityMap = {
            Emergency: 'High',
            Alert: 'High',
            Critical: 'High',
            Error: 'High',
            Warning: 'Medium',
            Notice: 'Low',
            Debug: 'Low',
            Informational: 'Low'
          };
          for (let key in eventLog) {
            let severityCode = '';
            let priority = '';
            let relatedItems = [];
            let eventID = 'None';
            let description = 'None';
            if (
              eventLog.hasOwnProperty(key) &&
              eventLog[key].hasOwnProperty('Id')
            ) {
              severityCode = eventLog[key].Severity.split('.').pop();
              priority = severityToPriorityMap[severityCode];
              severityFlags[priority.toLowerCase()] = true;
              if (eventLog[key].hasOwnProperty(['Associations'])) {
                eventLog[key].Associations.forEach(function(item) {
                  relatedItems.push(item[2]);
                });
              }
              if (eventLog[key].hasOwnProperty(['EventID'])) {
                eventID = eventLog[key].EventID;
              }
              if (eventLog[key].hasOwnProperty(['Description'])) {
                description = eventLog[key].Description;
              }
              eventLogData.push(
                Object.assign(
                  {
                    path: key,
                    priority: priority,
                    severity_code: severityCode,
                    severity_flags: severityFlags,
                    eventID: eventID,
                    description: description,
                    logId: '#' + eventLog[key].Id,
                    data: { key: key, value: eventLog[key] }
                  },
                  eventLog[key]
                )
              );
              commit('setEventLogData', eventLogData);
            }
          }
        })
        .catch(error => {
          console.log('Event Log Data:', error);
        });
    }
  }
};

export default EventLogStore;
