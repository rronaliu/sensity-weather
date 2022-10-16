<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Sensity Weather</a>
      <button
        v-if="isLogged"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        v-if="isLogged"
      >
        <div class="d-flex justify-content-between mt-2 w-100">
          <form role="search">
            <div class="d-flex">
              <input
                v-model="city"
                class="form-control me-2"
                type="search"
                placeholder="Search another city"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success"
                type="submit"
                @click="submit"
              >
                Search
              </button>
            </div>
          </form>
          <button
            class="btn btn-outline-warning mx-2"
            style="white-space: nowrap"
            type="submit"
            @click="logout"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLogged: {
      get() {
        return this.$store.state.isLogged;
      },
    },
  },
  data() {
    return {
      city: "",
    };
  },
  methods: {
    logout(e) {
      e.preventDefault();
      this.$store.commit("LOGOUT");
      this.$router.push("/register");
    },
    goToRegister() {
      this.$router.push("/register");
      this.$store.commit("SET_FORM_STEP", 1);
    },
    async submit(e) {
      e.preventDefault();
      const regex = /[a-zA-Z]+(?:[ '-][a-zA-Z]+)*/;
      if (!regex.test(this.city)) {
        return;
      }
      this.$store.commit("SET_IS_LOADING", true);
      this.$store.commit("SET_USER_CITY", this.city);
      await this.$store.dispatch("getWeather");
      this.$store.commit("SET_IS_LOADING", false);
    },
  },
};
</script>
