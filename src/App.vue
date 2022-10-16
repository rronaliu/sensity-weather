<template>
  <nav-bar />
  <div class="main-wrapper d-flex justify-content-center">
    <RouterView />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  async created() {
    this.$store.commit("SET_IS_LOADING", true);
    await this.$store.dispatch("getUser");
    this.$store.commit("SET_IS_LOADING", false);
  },
};
</script>
