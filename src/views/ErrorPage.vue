<template>
  <div class="error-page">
    <h1>Error 404</h1>
    <h4>Page not found</h4>
    <span
      >Go back to <span class="link-primary cursor-pointer " @click="goBack"
        >HomePage</span
      >
    </span>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
