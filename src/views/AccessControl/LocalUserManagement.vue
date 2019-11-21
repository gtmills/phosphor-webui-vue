<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-sm-12">
        <h1>Local user management</h1>
      </div>
    </div>
    <div class="bx--row">
      <div class="bx--col-lg-8 bx--col-md-10">
        <cv-data-table :columns="columns" :data="data"></cv-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import { CvDataTable } from "@carbon/vue";
export default {
  name: "local-users",
  components: {
    CvDataTable
  },
  data() {
    return {
      columns: ["Username", "Privilege", "Status"],
      data: [
        ["root", "Admin", "Enabled"],
        ["user1", "User", "Enabled"]
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
