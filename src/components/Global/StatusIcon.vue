<template>
  <span :class="['status-icon', status]">
    <icon-on v-if="status === 'on'" />
    <icon-error v-else-if="status === 'error'" />
    <icon-off v-else />
  </span>
</template>

<script>
import IconOn from "@carbon/icons-vue/es/checkmark--filled/20";
import IconOff from "@carbon/icons-vue/es/error--filled/20";
import IconError from "@carbon/icons-vue/es/warning--filled/20";

export default {
  name: "StatusIcon",
  props: ["status"],
  components: { IconOn, IconOff, IconError }
};
</script>

<style lang="scss" scoped>
.status-icon {
  vertical-align: text-bottom;
  &.on {
    fill: $success;
  }
  &.off {
    fill: $secondary;
  }
  &.error {
    fill: $danger;
  }
}
</style>
