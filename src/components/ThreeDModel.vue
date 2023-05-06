<template>
  <div v-if="!failedToLoad" class="three-d-model__wrapper">
    <Loader v-if="loading" class="three-d-model__loader" />
    <div v-if="showCopyMsg" class="three-d-model__copy-msg">
      ✔ Copied to clipboard
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
import props from "../mixins/props.js";
import data from "../mixins/data.js";
import computed from "../mixins/computed.js";
import methods from "../mixins/methods.js";
import log from "../utils/view-3d-model-logs.js";

export default {
  name: "ThreeDModel",
  mixins: [props, data, computed, methods],
  components: {
    Loader,
  },
  mounted() {
    this.initialize();
    this.setLights();
    this.animate();
    this.setEnvironment();
    this.createLoader();

    if (this.filePath) {
      this.gltfLoader.load(
        `${this.filePath}`,
        (gltf) => {
          const parser = gltf?.parser;
          const extensions = parser?.extensions;
          const extensionsUsed = parser?.json?.extensionsUsed;

          // methods/checkExtensions
          this.checkExtensions(extensions, extensionsUsed);
          // Setting this.model to gltf scene
          this.model = gltf.scene || gltf.scenes[0];
          // Get size and center from method/getSizeAndCenter
          const { size, center } = this.getCenterAndSize();
          // methods/centerModel
          this.centerModel(center);
          // methods/setCamera
          this.setCamera(size, center);
          // methods/setcontrols
          this.setControls(size);
          // methods/setRotations
          this.setRotation();
          // Adding model to the scene
          this.scene.add(this.model);
          // Set loading to false
          this.loading = false;
          log.msg("Model loaded");

          // Create editor if useEditor is set to true
          this.useEditor && this.createEditor();
        },
        // Being executed when loading model
        () => {
          log.msg("Loading model");
        },
        // Setting failedToLoad if error when loading
        (error) => {
          this.loading = false;
          this.failedToLoad = true;
          log.error("An error occured when loading asset.", error);
        }
      );
    }
  },
  beforeDestroy() {
    // Destroy gui before destroy (Vue2)
    if (this.gui) {
      this.gui.destroy();
    }
  },
  beforeUnmount() {
    // Destroy gui before unmount (Vue3)
    if (this.gui) {
      this.gui.destroy();
    }
  },
};
</script>
<style>
@import "../styles/three-d-model.css";
</style>
