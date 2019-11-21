<template>
  <cv-data-table :columns="columns">
    <template slot="data">
      <cv-data-table-row
        v-for="(row, rowIndex) in data"
        :key="`${rowIndex}`"
        :value="`${rowIndex}`"
      >
        <cv-data-table-cell
          v-for="(cell, cellIndex) in row"
          :key="`${cellIndex}`"
          :value="`${cellIndex}`"
        >
          <span v-if="cell === true"><Checkmark16 /></span>
          <span v-else>{{ cell }}</span>
        </cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
import Checkmark16 from "@carbon/icons-vue/es/checkmark/16";

export default {
  components: {
    Checkmark16
  },
  data() {
    return {
      columns: ["", "Admin", "Operator", "User", "Callback"],
      data: [
        ["Configure components managed by this service", true, "", "", ""],
        ["Configure manager resources", true, "", "", ""],
        ["Update password for current user account", true, "", "", ""],
        ["Configure users and their accounts", true, "", "", ""],
        ["Log in to the service and read resources", true, true, true, true],
        ["IPMI access point", true, true, true, true],
        ["Redfish access point", true, true, true, true],
        ["SSH access point", true, true, true, true],
        ["WebUI access point", true, true, true, true]
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
td:not(:first-child) {
  text-align: center;
  vertical-align: middle;
}
</style>
