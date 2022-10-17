<template>
  <div class="register-card mt-5" v-if="formStep == 1">
    <form class="card">
      <h3 class="card-title card-header">Register Page</h3>
      <div class="card-body">
        <div class="mb-3">
          <label for="nameInput" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="nameInput"
            v-model="userName"
          />
          <small v-if="error.name" class="text-danger">{{ error.name }}</small>
        </div>
        <div class="mb-3">
          <label for="cityInput" class="form-label">City</label>
          <input
            type="text"
            class="form-control"
            id="cityInput"
            v-model="userCity"
          />
          <small v-if="error.city" class="text-danger">{{ error.city }}</small>
        </div>
        <div class="mb-3 form-check d-flex justify-content-end">
          <button type="submit" class="btn btn-primary" @click="submitForm">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
  <div v-else>
    <camera-component />
  </div>
</template>

<script>
import CameraComponent from "../components/CameraComponent.vue";
import REGEX_CITY from "../constants/REGEX_CITY.js";
import validateCity from "../utils/validateCity.js";
import REGEX_NAME from "../constants/REGEX_NAME.js";
export default {
  components: {
    CameraComponent,
  },
  data() {
    return {
      error: {
        name: "",
        city: "",
      },
    };
  },
  computed: {
    formStep: {
      get() {
        return this.$store.state.formStep;
      },
    },
    userName: {
      get() {
        return this.$store.state.user.name;
      },
      set(value) {
        this.$store.commit("SET_USER_NAME", value);
      },
    },
    userCity: {
      get() {
        return this.$store.state.user.city;
      },
      set(value) {
        this.$store.commit("SET_USER_CITY", value);
      },
    },
  },
  methods: {
    // validateCity() {
    //   const testCity = REGEX_CITY.test(this.userCity);
    //   if (!testCity) {
    //     this.error.city = "Enter a valid City";
    //     return false;
    //   } else {
    //     this.error.city = "";
    //   }
    //   return true;
    // },
    validateName() {
      const testName = REGEX_NAME.test(this.userName);
      if (!testName) {
        this.error.name = "Name is required";
        return false;
      } else {
        this.error.name = "";
      }
      return true;
    },
    async submitForm(e) {
      e.preventDefault();
      const validCity = validateCity(this.userCity);

      if(!validCity) {
        this.error.city = "Enter a valid City";
      } else {
        this.error.city = "";
      }

      const validName = this.validateName();
      if (!validName || !validCity) {
        return;
      }
      
      this.$store.commit("SET_FORM_STEP", 2);
    },
  },
};
</script>

<style>
.register-card {
  width: 350px;
}
</style>
