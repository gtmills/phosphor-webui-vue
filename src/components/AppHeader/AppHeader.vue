<template>
  <div>
    <a class="link-skip-nav btn btn-light" href="#main-content"
      >Skip to content</a
    >
    <header id="page-header">
      <b-navbar toggleable="lg" variant="dark" type="dark">
        <b-navbar-nav small>
          <b-nav-text>BMC System Management</b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav small class="ml-auto">
          <b-nav-item @click="logout">
            <icon-avatar />
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-navbar toggleable="lg" variant="light">
        <b-navbar-nav>
          <b-navbar-brand href="/">
            {{ orgName }}
          </b-navbar-brand>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-text>{{ hostName }}</b-nav-text>
          <b-nav-text>{{ ipAddress }}</b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav>
            <b-nav-item>
              <b-button variant="link">
                Server health
                <b-badge pill variant="danger">Critical</b-badge>
              </b-button>
            </b-nav-item>
            <b-nav-item>
              <b-button variant="link">
                Server power
                <b-badge pill :variant="hostStatusBadge">
                  {{ hostStatus }}
                </b-badge>
              </b-button>
            </b-nav-item>
            <b-nav-item>
              <b-button variant="link">
                <icon-renew />
                Refresh Data
              </b-button>
            </b-nav-item>
          </b-nav>
        </b-navbar-nav>
      </b-navbar>
    </header>
  </div>
</template>

<script>
import IconAvatar from "@carbon/icons-vue/es/user--avatar/20";
import IconRenew from "@carbon/icons-vue/es/renew/20";
export default {
  name: "AppHeader",
  components: { IconAvatar, IconRenew },
  created() {
    this.getHostInfo();
  },
  data() {
    return {
      orgName: "IBM",
      ipAddress: "127.0.0.0"
    };
  },
  computed: {
    hostName() {
      return this.$store.getters["global/hostName"];
    },
    hostStatus() {
      return this.$store.getters["global/hostStatus"];
    },
    hostStatusBadge() {
      switch (this.hostStatus) {
        case "Running":
          return "success";
        case "Off":
          return "secondary";
        default:
          return "light";
      }
    }
  },
  methods: {
    getHostInfo() {
      this.$store.dispatch("global/getHostName");
      this.$store.dispatch("global/getHostStatus");
    },
    logout() {
      this.$store.dispatch("authentication/logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-text {
  padding: 0;
}

.link-skip-nav {
  position: absolute;
  top: -60px;
  left: 0.5rem;
  z-index: 10;
  transition: 150ms cubic-bezier(0.4, 0.14, 1, 1);

  &:focus {
    top: 0.5rem;
    transition-timing-function: cubic-bezier(0, 0, 0.3, 1);
  }
}
</style>
