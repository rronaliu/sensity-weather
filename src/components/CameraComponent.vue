<template>
  <BSpinner v-if="isLoadingPage" />
  <div class="web-camera-container mt-5" v-else>
    <div class="my-2 mb-4" v-if="!isCameraOpen">
      To continue, please take a selfie.
    </div>
    <div class="camera-button">
      <button
        type="button"
        class="btn"
        :class="{
          'btn-outline-primary': !isCameraOpen,
          'btn-outline-danger': isCameraOpen,
        }"
        @click="toggleCamera"
      >
        <span v-if="!isCameraOpen">Open Camera</span>
        <span v-else class="">Close Camera</span>
      </button>
    </div>

    <div v-show="isCameraOpen && isLoading" class="camera-loading">
      <BSpinner v-if="isLoading" />
    </div>

    <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box">
      <video
        v-show="!isPhotoTaken"
        ref="camera"
        :width="450"
        :height="337.5"
        autoplay
      ></video>

      <canvas
        v-show="isPhotoTaken"
        id="photoTaken"
        ref="canvas"
        :width="450"
        :height="337.5"
      ></canvas>
    </div>

    <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
      <button type="button" class="btn btn-primary" @click="takePhoto">
        <img
          style="filter: invert(1)"
          src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
        />
      </button>
    </div>

    <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
      Looking good?
      <a
        id="downloadPhoto"
        download="my-photo.jpg"
        class="link-primary cursor-pointer"
        @click="submitImage"
      >
        Continue
      </a>
    </div>
  </div>
</template>

<script>
import BSpinner from "./BSpinner.vue";
export default {
  components: {
    BSpinner,
  },
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isLoading: false,
    };
  },
  computed: {
    isLoadingPage: {
      get() {
        return this.$store.state.isLoading;
      },
    },
  },

  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log("error", error);
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    takePhoto() {
      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);

      this.stopCameraStream();
    },

    async submitImage() {
      const canvas = document
        .getElementById("photoTaken")
        .toDataURL("image/jpeg");
      this.$store.commit("SET_IS_LOADING", true);
      this.$store.commit("SET_USER_IMAGE", canvas);
      const res = await this.$store.dispatch("getWeather");
      await this.$store.dispatch("saveUser", this.$store.state.user);
      if (res) {
        this.$router.push("/");
      }
      this.$store.commit("SET_IS_LOADING", false);
    },
  },
};
</script>
