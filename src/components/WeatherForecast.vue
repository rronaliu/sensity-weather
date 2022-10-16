<template>
  <Spinner v-if="isLoading" />
  <div v-else>
    <div v-if="weather" class="d-flex flex-wrap mx-5">
      <div class="card card-item" v-for="(item, key) in weather" :key="key">
        <div
          class="d-flex align-items-center justify-content-around m-1 border-bottom"
        >
          <div class="d-flex align-items-center">
            <img
              :src="
                'http://openweathermap.org/img/w/' +
                item.weather[0].icon +
                '.png'
              "
              class="weather-img"
            />
            <div class="mx-2 card-title">
              <h5 class="mb-0">{{ item.weather[0].main }}</h5>
              <small class="text-muted">{{
                item.weather[0].description
              }}</small>
            </div>
          </div>
          <div class="mt-1 mr-2 card-title d-flex flex-column">
            <h6>Max: {{ Math.round(item.temp.max) }}°C</h6>
            <h6>Min: {{ Math.round(item.temp.min) }}°C</h6>
          </div>
        </div>
        <div class="card-body d-flex justify-content-between">
          <div
            class="card-text d-flex flex-column text-muted justify-content-between"
          >
            <span>Sunrise:</span>
            <span>Sunset:</span>
            <span>Humidity:</span>
            <span>Pressure:</span>
          </div>
          <div class="card-text d-flex flex-column justify-content-between">
            <span>{{ sunrise }}</span>
            <span>{{ sunset }}</span>
            <span>{{ item.humidity }}%</span>
            <span>{{ item.pressure }} hPa</span>
          </div>
        </div>
      </div>
    </div>
    <div class="" v-else-if="!weather">
      <h2 class="text-center">Please enter a valid City</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Spinner from "./BSpinner.vue";
export default {
  components: {
    Spinner,
  },
  computed: {
    ...mapState({
      weather: (state) => state.weather,
      isLoading: (state) => state.isLoading,
    }),
    sunrise() {
      const date = new Date(this.weather[0].sunrise * 1000);
      return date.toLocaleTimeString();
    },
    sunset() {
      const date = new Date(this.weather[0].sunset * 1000);
      return date.toLocaleTimeString();
    },
  },
  created() {
    this.$store.commit("SET_IS_LOADING", true);
    this.$store.dispatch("getWeather");
    this.$store.commit("SET_IS_LOADING", false);
  },
};
</script>

<style>
.weather-img {
  width: 50px;
}
.card-item {
  margin: 1rem;
  width: 250px !important;
}
</style>
