<template>
  <div>
    <b-list-group v-for="logData in eventLogData" :key="logData.id">
      <b-list-group-item href="#" class="flex-column align-items-start">
        {{ '#' + logData.logId }}
        <b-badge variant="danger">{{ logData.priority }}</b-badge>
        <div class="d-flex w-100 justify-content-between">
          <small>{{
            logData.Timestamp | date('MMM DD YYYY HH:MM:SS A ZZ')
          }}</small>
          <ChevronRight16 />
        </div>
        <p class="mb-1">{{ logData.eventID }}: {{ logData.description }}</p>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-if="!eventLogData">
      There are no high priority events to display at this time.
    </b-list-group>
  </div>
</template>

<script>
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';

export default {
  name: 'events',
  components: {
    ChevronRight16
  },
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
  }
};
</script>
