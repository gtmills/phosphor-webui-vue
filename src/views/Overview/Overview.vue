<template>
  <b-container fluid>
    <h1>Overview</h1>
    <b-row>
      <b-col lg="8" sm="12">
        <section>
          <h2>Server Information</h2>
          <b-row>
            <b-col sm="6">
              <dl>
                <dt>MODEL</dt>
                <dd>{{ serverInfo.Model || "N/A" }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>MANUFACTURER</dt>
                <dd>{{ serverInfo.Manufacturer || "N/A" }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>SERIAL NUMBER</dt>
                <dd>{{ serverInfo.SerialNumber || "N/A" }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>FIRMWARE VERSION</dt>
                <dd>{{ hostActiveVersion || "N/A" }}</dd>
              </dl>
            </b-col>
          </b-row>
        </section>
        <section>
          <h2>BMC information</h2>
          <b-row>
            <b-col sm="6">
              <dl>
                <dt>HOSTNAME</dt>
                <dd>{{ hostName }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>MAC ADDRESS</dt>
                <dd>{{ macAddress }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>IP ADDRESS</dt>
                <dd>
                  {{ ipAddress[0] }} <br />
                  {{ ipAddress[1] }}
                </dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>FIRMWARE VERSION</dt>
                <dd>{{ bmcActiveVersion }}</dd>
              </dl>
            </b-col>
          </b-row>
        </section>
        <section>
          <h2>Power consumption</h2>
          <b-row>
            <b-col sm="6">
              <dl>
                <dt>POWER CONSUMPTION</dt>
                <dd>{{ powerConsumption }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>POWER CAP</dt>
                <dd>{{ powerCapValue }}</dd>
              </dl>
            </b-col>
          </b-row>
        </section>
      </b-col>
      <b-col lg="4" sm="12">
        <quickLinks />
      </b-col>
    </b-row>
    <section>
      <h2>High priority events</h2>
      <events />
    </section>
  </b-container>
</template>

<script>
import OverviewQuickLinks from "./OverviewQuickLinks";
import OverviewEvents from "./OverviewEvents";

export default {
  name: "Overview",
  components: {
    quickLinks: OverviewQuickLinks,
    events: OverviewEvents
  },
  created() {
    this.getServerInfo();
    this.getHostInfo();
    this.getFirmwareInfo();
    this.getPowerData();
    this.getPowerCapData();
    this.getNetworkData();
    this.getEventLogData();
  },
  computed: {
    serverInfo() {
      return this.$store.getters["overview/serverInfo"];
    },
    hostName() {
      return this.$store.getters["global/hostName"];
    },
    hostActiveVersion() {
      return this.$store.getters["firmware/hostActiveVersion"];
    },
    bmcActiveVersion() {
      return this.$store.getters["firmware/bmcActiveVersion"];
    },
    powerConsumption() {
      return this.$store.getters["powerConsumption/powerConsumption"];
    },
    powerCapValue() {
      return this.$store.getters["powerCap/powerCapValue"];
    },
    ipAddress() {
      return this.$store.getters["networkSettings/ipAddress"];
    },
    macAddress() {
      return this.$store.getters["networkSettings/macAddress"];
    },
    eventLogData() {
      return this.$store.getters["eventLog/eventLogData"];
    }
  },
  methods: {
    getServerInfo() {
      this.$store.dispatch("overview/getServerInfo");
    },
    getHostInfo() {
      this.$store.dispatch("global/getHostName");
    },
    getFirmwareInfo() {
      this.$store.dispatch("firmware/getFirmwareInfo");
    },
    getPowerData() {
      this.$store.dispatch("powerConsumption/getPowerData");
    },
    getPowerCapData() {
      this.$store.dispatch("powerCap/getPowerCapData");
    },
    getNetworkData() {
      this.$store.dispatch("networkSettings/getNetworkData");
    },
    getEventLogData() {
      this.$store.dispatch("eventLog/getEventLogData");
    }
  },
  data() {
    return {
      logging: {
        entry: {
          Description:
            "An internal failure has occurred while performing an operation.",
          EventID: "FQPSPCR0021F",
          Id: 1,
          Resolved: false,
          Severity: "xyz.openbmc_project.Logging.Entry.Level.Error",
          Timestamp: 1574782085071,
          Version: "ibm-v2.7.0-rc1-5-gfd9b55f-r19-1-g8c075d3"
        }
      }
    };
  }
};
</script>
