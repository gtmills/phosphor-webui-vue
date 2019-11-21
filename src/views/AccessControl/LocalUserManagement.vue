<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-lg-8">
        <h1>Local user management</h1>
      </div>
    </div>
    <div class="bx--row">
      <div class="bx--col-lg-8 bx--col-md-10">
        <cv-data-table :columns="userTable.columns" :data="userTable.data">
          <template slot="actions">
            <cv-button
              :icon="icon.settings"
              :kind="'ghost'"
              @click="onClickSettings"
            >
              Account policy settings
            </cv-button>
            <cv-button :icon="icon.add" @click="onClickAdd">
              Add users
            </cv-button>
          </template>
        </cv-data-table>
      </div>
    </div>
    <div class="bx--row">
      <div class="bx--col-lg-6 bx--col-md-8">
        <cv-accordion>
          <cv-accordion-item :open="accordion.open">
            <template slot="title">View privilege role descriptions</template>
            <template slot="content">
              <role-table></role-table>
            </template>
          </cv-accordion-item>
        </cv-accordion>
      </div>
    </div>
    <cv-modal :visible="modal.settingsOpen" @modal-hidden="modalClosed">
      <template slot="title">Account policy settings</template>
      <template slot="secondary-button">Cancel</template>
      <template slot="primary-button">Save</template>
    </cv-modal>
    <cv-modal :visible="modal.addUserOpen" @modal-hidden="modalClosed">
      <template slot="title">Add user</template>
      <template slot="secondary-button">Cancel</template>
      <template slot="primary-button">Save</template>
    </cv-modal>
  </div>
</template>

<script>
import { CvDataTable, CvButton, CvModal, CvAccordion } from "@carbon/vue";
import Settings16 from "@carbon/icons-vue/es/settings/16";
import Add16 from "@carbon/icons-vue/es/add/16";

import LocalUserMangementRoleTable from "./LocalUserManagementRoleTable";

export default {
  name: "local-users",
  components: {
    CvDataTable,
    CvButton,
    CvModal,
    CvAccordion,
    roleTable: LocalUserMangementRoleTable
  },
  data() {
    return {
      userTable: {
        columns: ["Username", "Privilege", "Status"],
        data: [
          ["root", "Admin", "Enabled"],
          ["user1", "User", "Enabled"]
        ]
      },
      icon: {
        add: Add16,
        settings: Settings16
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
.cv-data-table {
  margin-bottom: 2rem;
}
.bx--accordion__item {
  border: none;
}
.bx--accordion__content {
  padding: 0;
}
</style>
