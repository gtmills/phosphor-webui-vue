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
  margin-top: $spacer * 1.5;
  margin-bottom: $spacer * 3;
}
</style>
