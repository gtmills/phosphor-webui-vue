<template>
  <b-container fluid>
    <PageTitle />
    <b-row>
      <b-col lg="8" sm="12">
        <PageSection sectionTitle="Server information">
          <b-row>
            <b-col sm="6">
              <dl>
                <dt>Model</dt>
                <dd>{{ serverModel }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>Manufacturer</dt>
                <dd>{{ serverManufacturer }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>Serial number</dt>
                <dd>{{ serverSerialNumber }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>Firmware version</dt>
                <dd>{{ hostActiveVersion }}</dd>
              </dl>
            </b-col>
          </b-row>
        </PageSection>
        <PageSection sectionTitle="BMC information">
          <b-row>
            <b-col sm="6">
              <dl>
                <dt>Hostname</dt>
                <dd>{{ hostName }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>MAC address</dt>
                <dd>{{ macAddress }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>IP address</dt>
                <dd v-for="ip in ipAddress" v-bind:key="ip.id">{{ ip }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>Firmware version</dt>
                <dd>{{ bmcActiveVersion }}</dd>
              </dl>
            </b-col>
          </b-row>
        </PageSection>
        <PageSection sectionTitle="Power consumption">
          <b-row>
            <b-col sm="6">
              <dl>
                <dt>Power consumption</dt>
                <dd>{{ powerConsumption }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>Power cap</dt>
                <dd>{{ powerCapValue }}</dd>
              </dl>
            </b-col>
          </b-row>
        </PageSection>
      </b-col>
      <b-col lg="4" sm="12">
        <OverviewQuickLinks />
      </b-col>
    </b-row>
    <PageSection sectionTitle="High priority events">
      <OverviewEvents />
    </PageSection>
  </b-container>
</template>

<script>
import OverviewQuickLinks from './OverviewQuickLinks';
import OverviewEvents from './OverviewEvents';
import PageTitle from '../../components/Global/PageTitle';
import PageSection from '../../components/Global/PageSection';

export default {
  name: 'Overview',
  components: {
    OverviewQuickLinks,
    OverviewEvents,
    PageTitle,
    PageSection
  },
  created() {
    this.getOverviewInfo();
  },
  computed: {
    serverModel() {
      return this.$store.getters['overview/serverModel'];
    },
    serverManufacturer() {
      return this.$store.getters['overview/serverManufacturer'];
    },
    serverSerialNumber() {
      return this.$store.getters['overview/serverSerialNumber'];
    },
    hostName() {
      return this.$store.getters['global/hostName'];
    },
    hostActiveVersion() {
      return this.$store.getters['firmware/hostActiveVersion'];
    },
    bmcActiveVersion() {
      return this.$store.getters['firmware/bmcActiveVersion'];
    },
    powerConsumption() {
      return this.$store.getters['powerConsumption/powerConsumption'];
    },
    powerCapValue() {
      return this.$store.getters['powerCap/powerCapValue'];
    },
    ipAddress() {
      return this.$store.getters['networkSettings/ipAddress'];
    },
    macAddress() {
      return this.$store.getters['networkSettings/macAddress'];
    }
  },
  methods: {
    getOverviewInfo() {
      this.$store.dispatch('overview/getServerInfo');
      this.$store.dispatch('global/getHostName');
      this.$store.dispatch('firmware/getFirmwareInfo');
      this.$store.dispatch('powerConsumption/getPowerData');
      this.$store.dispatch('powerCap/getPowerCapData');
      this.$store.dispatch('networkSettings/getNetworkData');
      this.$store.dispatch('eventLog/getEventLogData');
    }
  }
};
</script>
