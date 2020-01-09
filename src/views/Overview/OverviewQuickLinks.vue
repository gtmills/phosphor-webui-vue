<template>
  <b-row>
    <b-col md="6" lg="3" class="quicklinks-item">
      <dl>
        <dt>BMC time</dt>
        <dd>{{ bmcTime | date('MMM, DD YYYY HH:MM:SS A ZZ') }}</dd>
      </dl>
    </b-col>
    <b-col md="6" lg="3" class="quicklinks-item">
      <!-- TODO: add toggle LED on/off funtionality -->
      <dl>
        <dt>Server LED</dt>
        <dd>
          <b-form-checkbox
            v-model="serverLEDChecked"
            name="check-button"
            switch
          >
            <span v-if="!serverLEDChecked">On</span>
            <span v-else>Off</span>
          </b-form-checkbox>
        </dd>
      </dl>
    </b-col>
    <b-col lg="6" class="quicklinks-item">
      <b-row no-gutters>
        <b-col>
          <!-- TODO: link to network settings -->
          <b-button
            href="#"
            class="btn btn-secondary d-flex justify-content-between align-items-center"
          >
            <span>Edit network settings</span>
            <IconArrowRight />
          </b-button>
        </b-col>
        <b-col>
          <!-- TODO: link to SOL -->
          <b-button
            href="#"
            class="btn btn-secondary  d-flex justify-content-between align-items-center"
          >
            <span>Serial over LAN console</span>
            <IconArrowRight />
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import ArrowRight16 from '@carbon/icons-vue/es/arrow--right/16';

export default {
  name: 'quickLinks',
  components: {
    IconArrowRight: ArrowRight16
  },
  created() {
    this.getBmcTime();
  },
  computed: {
    bmcTime() {
      return this.$store.getters['global/bmcTime'];
    }
  },
  methods: {
    getBmcTime() {
      this.$store.dispatch('global/getBmcTime');
    }
  },
  data() {
    return {
      serverLEDChecked: false
    };
  }
};
</script>

<style lang="scss" scoped>
.quicklinks-item {
  align-items: start;
  background: $white;
  padding-top: $spacer * 0.5;
}
.btn {
  margin: $spacer * 0.5;
  margin-left: 0;
  min-width: 224px;
  max-width: 330px;
  white-space: nowrap;
}
dd,
dl {
  margin: 0;
}
</style>
