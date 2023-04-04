<template>
  <div @click="handleClick" id="model-wrapper">
    <div v-if="loading">laddar</div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default {
  name: "ThreeDModel",
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
        intensity: 0.1,
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
    // Watches container dimensions and calls 'updateCameraAndRenderer' whenever changes (changes when window resizes)
    containerDimensions(val) {
      if (val) {
        this.updateCameraAndRenderer(val);
      }
    },
  },
  mounted() {
    if (this.filePath) {
      this.createGltfLoader();

      this.gltfLoader.load(
        `${this.filePath}`,
        (gltf) => {
          console.log("log-- gltf scenes", gltf);
          this.loading = false;
          // gltf.scene.traverse((child) => {
          //   console.log("log-- child", child);
          //   if (child.isMesh) {
          //     const material = child.material;
          //     console.log("log-- material", material);
          //   }
          // });

          this.gltfScene = gltf.scene;
          const box = new THREE.Box3().setFromObject(this.gltfScene);
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());
          this.initialize();
          this.setLights();
          this.scene.add(this.gltfScene);
          this.animate();
          this.setCamera(size, center);
          this.enableOrbitControls && this.setControls(size);
          this.setEnvironment();
          this.autoRotate && this.rotate();
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
  beforeUnmount() {},
  methods: {
    // Creating gltfLoader and dracoLoader which is used if gltf is compressed with draco
    createGltfLoader() {
      this.gltfLoader = new GLTFLoader();
      this.dracoLoader = new DRACOLoader();
      this.gltfLoader.setCrossOrigin("anonymous");
      this.dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
    },
    // Creating a scene, camera and renders to components root element (this.$el)
    initialize() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        this.fov,
        this.width / this.height,
        this.near,
        this.far
      );
      const container = this.$el;
      this.renderer = new THREE.WebGLRenderer({
        container,
        antialias: true,
        alpha: true,
      });

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.$el.appendChild(this.renderer.domElement);

      window.addEventListener("resize", () => this.onWindowResize(), false);
    },
    // Adding lights to the scene, using values from props 'ambientLighting' and 'directionalLigthing'
    setLights() {
      console.log("log-- position", this.ambientLighting);

      this.ambientLight = new THREE.AmbientLight(
        this.ambientLighting?.color ?? this.ambientLightingDefault.color,

        this.ambientLighting?.intensity ?? this.ambientLightingDefault.intensity
      );
      this.scene.add(this.ambientLight);

      this.directionalLight = new THREE.DirectionalLight(
        this.directionalLighting?.color ??
          this.directionalLightingDefault.color,

        this.directionalLighting?.intensity ??
          this.directionalLightingDefault.intensity
      );
      console.log("log-- directional", this.directionalLighting);

      console.log("log-- default directional", this.directionalLightingDefault);
      this.directionalLight.position.set(
        this.directionalLighting?.position?.x ??
          this.directionalLightingDefault.position.x,

        this.directionalLighting?.position?.y ??
          this.directionalLightingDefault.position.y,

        this.directionalLighting?.position?.z ??
          this.directionalLightingDefault.position.z
      );
      // const helper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
      // this.scene.add(helper);

      this.scene.add(this.directionalLight);
    },
    // Adds an environment to the scene, to provide even light
    setEnvironment() {
      this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.pmremGenerator.compileEquirectangularShader();
      this.environment = this.pmremGenerator.fromScene(
        new RoomEnvironment()
      ).texture;

      this.scene.environment = this.environment;
    },
    // Adds orbit controls to be able to interact with the model
    setControls(size) {
      this.orbitControls = new OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.orbitControls.maxDistance = size * 10;
    },
    // Sets the camera position and point at center of the scene
    setCamera(size, center) {
      this.camera.near = size / 100;
      this.camera.far = size * 100;
      this.camera.updateProjectionMatrix();
      this.camera.position.copy(center);
      this.camera.position.x += size / 1.5;
      this.camera.position.y += size / 3;
      this.camera.position.z += size / 1.5;
      this.camera.lookAt(center);
    },
    // Adds rotation to the scene on chosen axis
    rotate() {
      // this.scene.rotation.x += 0.01;
      this.scene.rotation.y += 0.01;
      // this.scene.rotation.z += 0.01;
      requestAnimationFrame(this.rotate);
    },
    handleClick() {
      console.log("log-- domElement", this.renderer);
      this.$emit("clicked", "hej från 3d model viewer");
    },
    // Adds animation loop
    animate() {
      window.requestAnimationFrame(this.animate);
      this.render();
      if (this.orbitControls) {
        this.orbitControls.update();
      }
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    // Updates camera aspect ratio
    updateCameraAndRenderer(dimensions) {
      const { width, height } = dimensions;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },
    // Updates container dimensions when resizing window
    onWindowResize() {
      const element = this.$el;
      if (element.clientWidth !== 0 && element.clientHeight !== 0) {
        this.containerDimensions = {
          width: element.clientWidth,
          height: element.clientHeight,
        };
      }
    },
  },
};
</script>

<style scoped></style>
