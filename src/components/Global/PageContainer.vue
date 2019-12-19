<template>
  <main id="main-content" class="page-container">
    <slot />
  </main>
</template>

<script>
export default {
  name: "PageContainer"
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 24px;
  margin-bottom: 50px;
}
</style>
