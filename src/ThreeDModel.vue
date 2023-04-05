<template>
  <div @click="handleClick" id="model-wrapper">
    <div v-if="loading">laddar</div>
  </div>
</template>

<script>
import MixThreeDModel from "./MixThreeDModel";
import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default {
  name: "ThreeDModel",
  mixins: [MixThreeDModel],
  ssr: false,
  props: {
    filePath: {
      type: String,
      required: true,
    },
    autoRotate: {
      type: Boolean,
      default: false,
    },
    enableOrbitControls: {
      type: Boolean,
      default: true,
    },
    // Illuminates the scene equally, without direction, set intensity and color to adjust the light
    ambientLighting: {
      type: Object,
      default: () => ({
        intensity: 0.5,
        color: "#FFFFFF",
      }),
    },
    // A light in a specific direction, used to simulate daylight
    // Default position is x:0, y:1, z:0 meaning that the light shines from the top down.
    // Set intensity, color, and position to adjust the light
    directionalLighting: {
      type: Object,
      default: () => ({
        intensity: 0.5,
        color: "#FFFFFF",
        position: {
          x: 0,
          y: 1,
          z: 0,
        },
      }),
    },
  },
  data: () => ({
    defaultSettings: {},
    // Camera frustum vertical field of view, from bottom to top, set in degrees
    fov: 60,
    // Camera frustum near plane
    near: 0.1,
    // Camera frustum far plane
    far: 1000,
    // Container dimensions. Will be updated on window.resize
    containerDimensions: {
      width: 0,
      height: 0,
    },
    loading: true,
  }),
  computed: {
    ambientLightingDefault() {
      return this.$options.props.ambientLighting.default();
    },
    directionalLightingDefault() {
      return this.$options.props.directionalLighting.default();
    },
    height() {
      // return window.getComputedStyle(this.$el).height;
      return this.$el.clientHeight;
    },
    width() {
      // window.getComputedStyle(this.$el).width;
      return this.$el.clientWidth;
    },
  },
  watch: {
    // Watches container dimensions and calls 'updateCameraAndRenderer' whenever dimensions changes (changes when window resizes)
    containerDimensions(val) {
      if (val) {
        this.updateCameraAndRenderer(val);
      }
    },
  },
  mounted() {
    this.initialize();
    this.setLights();
    this.animate();
    this.setEnvironment();
    this.autoRotate && this.rotate();
    if (this.filePath) {
      this.createGltfLoader();

      this.gltfLoader.load(
        `${this.filePath}`,
        (gltf) => {
          console.log("log-- gltf scenes", gltf);

          this.gltfScene = gltf.scene || gltf.scenes[0];

          const { size, center } = this.getCenterAndSize();

          this.centerModel(center);
          this.setCamera(size, center);
          this.enableOrbitControls && this.setControls(size);
          this.loading = false;
          this.scene.add(this.gltfScene);
        },
        (xhr) => {
          console.log(
            `Loading model: ${(xhr.loaded / xhr.total) * 100}% loaded`
          );
        },
        (error) => {
          console.log("An error occured", error);
        }
      );
    }
  },
  // All methods used is to be found in MixThreeDModel.js
  methods: {},
};
</script>

<style scoped></style>
