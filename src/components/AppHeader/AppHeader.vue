<template>
  <cv-header aria-label="Carbon tutorial">
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name href="/" :prefix="orgName">
      System Management
    </cv-header-name>
    <div>
      <span class="server-name bx--header__name">{{ serverName }}</span>
      <span class="ip-address">{{ ipAddress }}</span>
    </div>
    <template slot="header-global">
      <cv-header-global-action aria-label="Refresh Data">
        <Renew20 />
      </cv-header-global-action>
      <cv-header-global-action aria-label="User avatar">
        <user-avatar-20 />
      </cv-header-global-action>
    </template>
  </cv-header>
</template>

<script>
import UserAvatar20 from "@carbon/icons-vue/es/user--avatar/20";
import Renew20 from "@carbon/icons-vue/es/renew/20";
export default {
  name: "AppHeader",
  components: { Renew20, UserAvatar20 },
  data() {
    return {
      orgName: "IBM",
      serverName: "Witherspoon Something or Another",
      ipAddress: "127.0.0.0"
    };
  }
};
</script>

<style lang="scss" scoped>
.server-name {
  margin-left: 3rem;
  &:after {
    content: " | ";
    display: inline-block;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>
