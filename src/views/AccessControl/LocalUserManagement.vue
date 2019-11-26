<template>
  <b-container fluid>
    <b-row>
      <b-col lg="8">
        <h1>Local user management</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="8" md="10">
        <b-button v-b-modal.modal-settings variant="secondary"
          >Account policy settings</b-button
        >
        <b-button v-b-modal.modal-add-user variant="primary">Add user</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="8" md="10">
        <b-table
          bordered
          head-variant="dark"
          :items="userTable.items"
        ></b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" md="8">
        <b-button v-b-toggle.collapse-role-table variant="info" class="mt-3"
          >View privilege role descriptions</b-button
        >
        <b-collapse id="collapse-role-table" class="mt-3">
          <role-table />
        </b-collapse>
      </b-col>
    </b-row>
    <!-- Modals -->
    <b-modal id="modal-add-user" title="Add user">
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <b-button size="sm" variant="secondary" @click="cancel()"
          >Cancel</b-button
        >
        <b-button size="sm" variant="primary" @click="ok()">Add user</b-button>
      </template>
    </b-modal>
    <b-modal id="modal-settings" title="Account policy settings"> </b-modal>
  </b-container>
</template>

<script>
import LocalUserManagementRoleTable from "./LocalUserMangementRoleTable";

export default {
  name: "local-users",
  components: {
    roleTable: LocalUserManagementRoleTable
  },
  data() {
    return {
      userTable: {
        items: [
          { username: "root", privilege: "Admin", status: "Enabled" },
          { username: "user", privilege: "User", status: "Enabled" }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
