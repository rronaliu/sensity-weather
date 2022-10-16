<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <user-component :image="userImage" :name="userName" :city="userCity" />
    <span @click="refreshData" class="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-clockwise"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
        />
        <path
          d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
        />
      </svg>
      Refresh data
    </span>

    <weather-forecast />
  </div>
</template>

<script>
import UserComponent from "../components/UserComponent.vue";
import WeatherForecast from "../components/WeatherForecast.vue";
import { mapState } from "vuex";
export default {
  components: {
    UserComponent,
    WeatherForecast,
  },
  computed: {
    ...mapState({
      isLogged: (state) => state.isLogged,
      userName: (state) => state.user.name,
      userCity: (state) => state.user.city,
      userImage: (state) => state.user.image,
    }),
  },
  methods: {
    refreshData() {
      this.$store.commit("SET_IS_LOADING", true);
      this.$store.dispatch("getWeather");
      this.$store.commit("SET_IS_LOADING", false);
    },
  },
};
</script>

<style></style>
