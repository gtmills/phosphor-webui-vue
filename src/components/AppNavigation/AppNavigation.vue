<template>
  <cv-side-nav id="side-nav" fixed expanded>
    <cv-side-nav-items>
      <cv-side-nav-link to="/">
        <template slot="nav-icon"><Analytics16 /></template>
        Overview
      </cv-side-nav-link>
      <cv-side-nav-menu title="Health">
        <template slot="nav-icon"><DataCheck16 /></template>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Event log
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Hardware status
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Sensors
        </cv-side-nav-menu-item>
      </cv-side-nav-menu>
      <cv-side-nav-menu title="Control">
        <template slot="nav-icon"><SettingsAdjust16 /></template>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Server power operations
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Manage power usage
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Server LED
        </cv-side-nav-menu-item>
      </cv-side-nav-menu>
      <cv-side-nav-menu title="Configuration">
        <template slot="nav-icon"><Settings16 /></template>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Network setetings
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          SNMP settings
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          Firmware
        </cv-side-nav-menu-item>
      </cv-side-nav-menu>
      <cv-side-nav-menu title="Access Control">
        <template slot="nav-icon"><Password16 /></template>
        <cv-side-nav-menu-item href="javascript:void(0)">
          LDAP
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item to="/access-control/local-user-management">
          Local user management
        </cv-side-nav-menu-item>
        <cv-side-nav-menu-item href="javascript:void(0)">
          SSL Certificates
        </cv-side-nav-menu-item>
      </cv-side-nav-menu>
    </cv-side-nav-items>
  </cv-side-nav>
</template>

<script>
import Analytics16 from "@carbon/icons-vue/es/analytics/16";
import DataCheck16 from "@carbon/icons-vue/es/data--check/16";
import SettingsAdjust16 from "@carbon/icons-vue/es/settings--adjust/16";
import Settings16 from "@carbon/icons-vue/es/settings/16";
import Password16 from "@carbon/icons-vue/es/password/16";

export default {
  name: "AppNavigation",
  components: {
    Analytics16,
    DataCheck16,
    SettingsAdjust16,
    Settings16,
    Password16
  }
};
</script>
