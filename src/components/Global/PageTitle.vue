<template>
  <header class="page-title">
    <h1>{{ pageTitle }}</h1>
    <p v-if="pageDescription">{{ pageDescription }}</p>
  </header>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["pageTitle", "pageDescription"]
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: $display4-weight;
  line-height: $display-line-height;
}
.page-title {
  margin-bottom: 2rem;
}
.page-description {
  max-width: 750px;
}
</style>
