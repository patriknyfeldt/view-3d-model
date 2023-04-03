<template>
  <div @click="handleClick" id="model-wrapper"></div>
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
  },
  data: () => ({
    fov: 60,
    near: 0.1,
    far: 1000,
    canvasId: "model",
    wrapperId: "model-wrapper",
    containerDimensions: {
      width: 0,
      height: 0,
    },
  }),
  computed: {
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
    containerDimensions(val) {
      console.log(val);
    },
  },
  mounted() {
    // console.log("log-- height", this.height);
    // console.log("log-- width", this.width);
    if (this.filePath) {
      // const scene = new SceneInit(this.canvasId, this.wrapperId);
      this.gltfLoader = new GLTFLoader();
      this.dracoLoader = new DRACOLoader();

      this.gltfLoader.setCrossOrigin("anonymous");
      this.dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
      this.gltfLoader.load(
        `${this.filePath}`,
        (gltf) => {
          this.loadedModel = gltf;
          this.gltfScene = gltf.scene;
          const box = new THREE.Box3().setFromObject(this.gltfScene);
          const size = box.getSize(new THREE.Vector3()).length();
          console.log("log-- size", size);
          const center = box.getCenter(new THREE.Vector3());
          this.initialize();

          this.scene.add(this.gltfScene);
          this.animate();
          this.setCamera(size, center);
          this.enableOrbitControls && this.setControls(size);
          this.setEnvironment();
          this.autoRotate && this.rotate();
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
  beforeUnmount() {},
  methods: {
    loadGltf() {},
    initialize() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        this.fov,
        this.width / this.height,
        0.1,
        1000
      );
      // const canvas = document.getElementById(this.canvasId);
      const container = this.$el;
      // const container = document.getElementById("model-wrapper");
      // console.log("log-- canvas", canvas);
      // console.log("log-- el", this.$el);
      this.renderer = new THREE.WebGLRenderer({
        container,
        antialias: true,
        alpha: true,
      });
      // console.log("log-- renderer", this.renderer.state);
      console.log("log-- devicePixelratio", window.devicePixelRatio);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      // const wrapper = document.getElementById(this.wrapperId);
      // const wrapper = this.$el;
      this.$el.appendChild(this.renderer.domElement);

      // this.orbitControls = new OrbitControls(
      //   this.camera,
      //   this.renderer.domElement
      // );
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      this.ambientLight.castShadow = true;
      this.scene.add(this.ambientLight);

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      this.directionalLight.position.set(45, 45, 45);
      this.scene.add(this.directionalLight);

      window.addEventListener("resize", () => this.onWindowResize(), false);
    },
    setEnvironment() {
      this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.pmremGenerator.compileEquirectangularShader();
      this.environment = this.pmremGenerator.fromScene(
        new RoomEnvironment()
      ).texture;

      this.scene.environment = this.environment;
    },
    setControls(size) {
      this.orbitControls = new OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.orbitControls.maxDistance = size * 10;
    },
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
    rotate(x, y, z) {
      // this.scene.rotation.x += 0.01;
      this.scene.rotation.y += 0.01;
      // this.scene.rotation.z += 0.01;
      requestAnimationFrame(this.rotate.bind(this));
    },
    handleClick() {
      this.$emit("clicked", "hej från 3d model viewer");
    },
    animate() {
      this.animationId = window.requestAnimationFrame(this.animate);
      this.render();
      if (this.orbitControls) {
        this.orbitControls.update();
      }
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      const container = this.$el;
      console.log(
        "log-- container computed style height",
        window.getComputedStyle(container).height
      );
      console.log(
        "log-- container computed style width",
        window.getComputedStyle(container).width
      );
      // const width = this.$el.clientWidth;
      // const height = this.$el.clientHeight;
      // const width = window.getComputedStyle(container).width;
      // const height = window.getComputedStyle(container).height;
      // this.camera.aspect =
      //   window.getComputedStyle(container).width /
      //   window.getComputedStyle(container).height;
      // this.camera.updateProjectionMatrix();
      // this.renderer.setSize(
      //   window.getComputedStyle(container).width /
      //     window.getComputedStyle(container).height
      // );
      const element = this.$el;
      console.log(element);
      const computedStyle = window.getComputedStyle(element);
      console.log("log-- computedStyle", computedStyle);
      const { width, height } = computedStyle;
      this.containerDimensions = {
        width: parseFloat(width),
        height: parseFloat(height),
      };
      console.log("log-- width", this.containerDimensions.width);
      console.log("log-- height", this.containerDimensions.height);

      this.camera.aspect =
        this.containerDimensions.width / this.containerDimensions.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.containerDimensions.width,
        this.containerDimensions.height
      );
    },
  },
};
</script>

<style scoped></style>
