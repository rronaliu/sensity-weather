<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <user-component :image="userImage" :name="userName" :city="userCity" />
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
};
</script>

<style></style>
