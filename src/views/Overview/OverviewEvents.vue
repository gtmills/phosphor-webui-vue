<template>
  <div>
    <!-- TODO: link to event log -->
    <b-button variant="link" href="#">View all event logs</b-button>
    <div v-if="!eventLogData">
      There are no high priority events to display at this time.
    </div>
    <b-table
      head-variant="dark"
      per-page="5"
      sortBy="logId"
      sortDesc
      stacked="sm"
      v-else
      :items="eventLogData"
      :fields="fields"
    >
      <template v-slot:cell(timestamp)="data">
        {{ data.value | date('hh:MM:SS A') }} <br />
        {{ data.value | date('dddd, MMM DD, YYYY') }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'events',
  created() {
    this.getEventLogData();
  },
  computed: {
    eventLogData() {
      return this.$store.getters['eventLog/eventLogData'];
    }
  },
  methods: {
    getEventLogData() {
      this.$store.dispatch('eventLog/getEventLogData');
    }
  },
  data() {
    return {
      fields: [
        {
          key: 'logId',
          label: 'ID'
        },
        {
          key: 'eventID',
          label: 'SRC code'
        },
        {
          key: 'timestamp',
          label: 'Date'
        },
        {
          key: 'description',
          Label: 'Description'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.btn {
  float: right;
  margin-top: -3rem;
}
</style>
