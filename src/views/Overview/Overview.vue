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
                <dd>{{ bmcActiveVersion || "N/A" }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>MAC ADDRESS</dt>
                <dd>{{ network.eth0.MACAddress || "N/A" }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>IP ADDRESS</dt>
                <dd>{{ network.ipv4.Address || "N/A" }}</dd>
              </dl>
            </b-col>
            <b-col sm="6">
              <dl>
                <dt>FIRMWARE VERSION</dt>
                <dd>{{ logging.entry.Version || "N/A" }}</dd>
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
      return this.$store.getters["power/powerConsumption"];
    },
    powerCapValue() {
      return this.$store.getters["powerCap/powerCapValue"];
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
      this.$store.dispatch("power/getPowerData");
    },
    getPowerCapData() {
      this.$store.dispatch("powerCap/getPowerCapData");
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
      },
      network: {
        eth0: {
          MACAddress: "00:00:00:00:00:00"
        },
        ipv4: {
          Address: "00.00.00.00"
        }
      }
    };
  }
};
</script>
