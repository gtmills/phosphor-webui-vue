<template>
  <div id="app">
    <AppHeader />
    <AppNavigation />
    <cv-content id="#main-content">
      <router-view />
    </cv-content>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_carbon";
</style>

<script>
import AppHeader from "@/components/AppHeader";
import AppNavigation from "@/components/AppNavigation";
export default {
  name: "App",
  components: {
    AppHeader,
    AppNavigation
  }
};
</script>
