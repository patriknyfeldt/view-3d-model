<template>
  <div @click="handleClick" ref="wrapper" id="model-wrapper">
    <canvas id="model"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SceneInit from "./lib/SceneInit";

export default {
  name: "ThreeDModel",
  ssr: false,
  props: {
    filePath: {
      type: String,
      required: true,
    },
    rotate: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    scene: undefined,
    camera: undefined,
    renderer: undefined,
    fov: 60,
    nearPlane: 1,
    farPlane: 1000,
    canvasId: "model",
    wrapperId: "model-wrapper",
    clock: undefined,
    orbitControls: undefined,
    ambientLight: undefined,
    directionalLight: undefined,
    loadedGltf: undefined,
  }),
  computed: {},
  watch: {},
  mounted() {
    if (this.filePath) {
      const scene = new SceneInit(this.canvasId, this.wrapperId);
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();

      gltfLoader.setCrossOrigin("anonymous");
      dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load(
        `${this.filePath}`,
        (gltf) => {
          // loadedModel = gltf;
          this.gltfLoaded = true;
          this.loadedModel = gltf;
          console.log("log-- gltf", gltf);
          const gltfScene = gltf.scene;
          // const { scene } = gltf;
          const box = new THREE.Box3().setFromObject(gltfScene);
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());

          scene.initialize(400, 300);
          scene.animate();
          scene.setControls(size);
          scene.setCamera(size, center);
          scene.scene.add(gltfScene);
          scene.animate();
          this.rotate && scene.rotate();
        },
        (xhr) => {
          console.log("log-- ", xhr);
        },
        (error) => {
          console.log("log-- an error occured", error);
        }
      );
    }
  },
  methods: {
    handleClick() {
      this.$emit("clicked", "hej från 3d model viewer");
    },
  },
};
</script>

<style scoped>
#model {
  cursor: grab;
}
</style>
