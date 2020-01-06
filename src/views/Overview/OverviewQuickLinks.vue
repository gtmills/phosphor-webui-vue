<template>
  <b-list-group horizontal="md">
    <b-list-group-item class="flex-fill">
      <dl>
        <dt>BMC time</dt>
        <dd>{{ bmc.Elapsed | date('MMM, DD YYYY HH:MM:SS A ZZ') }}</dd>
      </dl>
    </b-list-group-item>
    <b-list-group-item class="flex-fill">
      <!-- TODO: add toggle LED on/off funtionality -->
      <dl>
        <dt>Server LED</dt>
        <dd>
          <b-form-checkbox v-model="checked" name="check-button" switch>
            <span v-if="!checked">on</span>
            <span v-else>off</span>
          </b-form-checkbox>
        </dd>
      </dl>
    </b-list-group-item>
    <b-list-group-item class="flex-fill d-flex align-items-center">
      <!-- TODO: link to SOL -->
      <b-button
        href="#"
        block
        variant="primary"
        class="btn btn-primary d-flex justify-content-between align-items-center"
      >
        <span>Serial over LAN console</span>
        <ArrowRight16 />
      </b-button>
    </b-list-group-item>
    <b-list-group-item class="flex-fill d-flex align-items-center">
      <!-- TODO: link to network settings -->
      <b-button
        href="#"
        block
        variant="primary"
        class="btn btn-primary d-flex justify-content-between align-items-center"
      >
        <span>Edit network settings</span>
        <ArrowRight16 />
      </b-button>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import ArrowRight16 from '@carbon/icons-vue/es/arrow--right/16';

export default {
  name: 'quickLinks',
  components: {
    ArrowRight16
  },
  data() {
    return {
      bmc: {
        Elapsed: 1574782085071
      },
      logging: {
        entry: {
          Severity: 'Error'
        }
      },
      checked: false
    };
  }
};
</script>

<style lang="scss" scoped>
.list-group-horizontal-md {
  width: 100%;
}
.list-group-horizontal-md .list-group-item {
  border: none;
  dl,
  dd {
    margin-bottom: 0;
  }
  .btn {
    align-content: center;
  }
}
</style>
