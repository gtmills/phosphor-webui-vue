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
          const eventLog = JSON.stringify(data.data);
          const eventLogContent = JSON.parse(eventLog);
          let eventLogData = [];

          for (let key in eventLogContent) {
            let severityCode = '';
            let priority = '';
            let relatedItems = [];
            let eventID = 'None';
            let description = 'None';
            const severityFlags = {
              low: false,
              medium: false,
              high: false
            };
            const SEVERITY_TO_PRIORITY_MAP = {
              Emergency: 'High',
              Alert: 'High',
              Critical: 'High',
              Error: 'High',
              Warning: 'Medium',
              Notice: 'Low',
              Debug: 'Low',
              Informational: 'Low'
            };

            if (
              eventLogContent.hasOwnProperty(key) &&
              eventLogContent[key].hasOwnProperty('Id')
            ) {
              severityCode = eventLogContent[key].Severity.split('.').pop();
              priority = SEVERITY_TO_PRIORITY_MAP[severityCode];
              severityFlags[priority.toLowerCase()] = true;

              if (eventLogContent[key].hasOwnProperty(['Associations'])) {
                eventLogContent[key].Associations.forEach(function(item) {
                  relatedItems.push(item[2]);
                });
              }

              if (eventLogContent[key].hasOwnProperty(['EventID'])) {
                eventID = eventLogContent[key].EventID;
              }

              if (eventLogContent[key].hasOwnProperty(['Description'])) {
                description = eventLogContent[key].Description;
              }

              eventLogData.push(
                Object.assign(
                  {
                    path: key,
                    copied: false,
                    priority: priority,
                    severity_code: severityCode,
                    severity_flags: severityFlags,
                    additional_data: eventLogContent[key].AdditionalData.join(
                      '\n'
                    ),
                    type: eventLogContent[key].Message,
                    selected: false,
                    meta: false,
                    confirm: false,
                    related_items: relatedItems,
                    eventID: eventID,
                    description: description,
                    logId: '#' + eventLogContent[key].Id,
                    data: { key: key, value: eventLogContent[key] }
                  },
                  eventLogContent[key]
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
