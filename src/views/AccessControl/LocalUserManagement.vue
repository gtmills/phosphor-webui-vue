<template>
  <b-container fluid>
    <b-row>
      <b-col lg="8">
        <h1>Local user management</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="8" md="10">
        <b-table bordered head-variant="dark" :items="userTable.data"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "local-users",
  components: {},
  data() {
    return {
      userTable: {
        data: [
          { username: "root", privilege: "Admin", status: "Enabled" },
          { username: "user", privilege: "User", status: "Enabled" }
        ]
      },
      modal: {
        addUserOpen: false,
        settingsOpen: false
      },
      accordion: {
        expanded: false
      }
    };
  },
  methods: {
    onClickAdd() {
      this.modal.addUserOpen = true;
    },
    onClickSettings() {
      this.modal.settingsOpen = true;
    },
    modalClosed() {
      this.modal.settingsOpen = false;
      this.modal.addUserOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
