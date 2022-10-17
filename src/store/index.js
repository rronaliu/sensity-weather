import { createStore } from "vuex";
import User from "../models/User";
import axios from "axios";
const weatherURL = "https://api.openweathermap.org";
const weatherAPIKey = "1d671ccb31ebd1da96b9702ae3c987ab";
// Create a new store instance.
const store = createStore({
  state: {
    isLoading: false,
    user: new User(),
    formStep: 1,
    weather: [],
    isLogged: false,
  },
  mutations: {
    INIT_USER_OBJECT(state) {
      state.user = new User();
    },
    SET_USER_OBJECT(state, data) {
      const user = new User();
      user.fromData(data);
      state.user = user;
    },
    SET_USER_NAME(state, data) {
      state.user.name = data;
    },
    SET_USER_CITY(state, data) {
      state.user.city = data;
    },
    SET_USER_IMAGE(state, data) {
      state.user.image = data;
    },
    SET_FORM_STEP(state, data) {
      state.formStep = data;
    },
    SET_IS_LOADING(state, data) {
      state.isLoading = data;
    },
    SET_WEATHER(state, data) {
      state.weather = data;
    },
    SET_IS_LOGGED(state, data) {
      state.isLogged = data;
    },
    LOGOUT(state) {
      state.isLogged = false;
      state.formStep = 1;
      state.user = new User();
      localStorage.removeItem("user");
    },
  },
  actions: {
    getUser({ commit }) {
      const reference = localStorage.getItem("user");
      if (reference) {
        commit("SET_USER_OBJECT", JSON.parse(reference));
        commit("SET_IS_LOGGED", true);
      } else {
        commit("INIT_USER_OBJECT");
      }
    },
    getWeather({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${weatherURL}/geo/1.0/direct?q=${state.user.city}&appid=${weatherAPIKey}`
          )
          .then((response) => {
            if (response && response.data && response.data.length > 0) {
              let lat = response.data[0].lat;
              let lon = response.data[0].lon;
              commit("SET_USER_CITY", response.data[0].name);
              dispatch("getFiveDayForecast", { lat, lon });
            } else {
              commit("SET_WEATHER", null);
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit("SET_IS_LOADING", false);
          });
      });
    },
    getFiveDayForecast({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${weatherURL}/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=current,minutely,hourly&appid=${weatherAPIKey}&units=metric`
          )
          .then((response) => {
            if (response && response.data) {
              commit("SET_WEATHER", response.data.daily.slice(0, 5));
              commit("SET_IS_LOGGED", true);
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    saveUser({ commit }, data) {
      if (data.name && data.city && data.image) {
        commit("SET_USER_OBJECT", data);
        localStorage.setItem("user", JSON.stringify(data));
      }
    },
  },
});

export default store;
