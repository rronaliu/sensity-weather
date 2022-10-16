<template>
  <div class="card m-3">
    <div class="row g-0 d-flex justify-content-center">
      <div
        class="col-md-4 d-flex align-items-center justify-content-center my-2"
        style="min-width: 150px"
      >
        <img :src="image" class="avatar" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h4 class="card-title">Welcome {{ name }}</h4>
          <div v-if="weather">
            <h5>City: {{ city }}</h5>
            <p class="card-text">
              This is a weather forecast of the next 5 days. In {{ city }}.
            </p>
          </div>
          <div class="card-text" v-else>
            <p>No such city.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  computed: {
    weather() {
      return this.$store.state.weather;
    },
  },
};
</script>

<style>
.avatar {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  padding: 1px;
  border: 1px solid #ddd;
}
</style>
