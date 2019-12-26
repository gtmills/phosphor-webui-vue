<template>
  <header class="page-title">
    <h1>{{ pageTitle }}</h1>
    <p v-if="pageDescription">{{ pageDescription }}</p>
  </header>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['pageTitle', 'pageDescription']
};
</script>

<style lang="scss" scoped>
.page-title {
  margin-bottom: $spacer * 2;
}
h1 {
  font-weight: $display4-weight;
  line-height: $display-line-height;
}
p {
  max-width: 72ch;
}
</style>
