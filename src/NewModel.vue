<template>
  <div></div>
</template>
<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default {
  name: "NewModel",
  mixins: [],
  props: {
    filePath: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    background: false,
    playbackSpeed: 1.0,
    actionStates: {},
    wireframe: false,
    skeleton: false,
    grid: false,

    // Lights
    punctualLights: true,
    exposure: 0.0,
    toneMapping: THREE.LinearToneMapping,
    textureEncoding: "sRGB",
    ambientIntensity: 0.3,
    ambientColor: 0xffffff,
    directIntensity: 0.8 * Math.PI, // TODO(#116)
    directColor: 0xffffff,
    bgColor: 0x191919,
  }),
  computed: {},
  watch: {},
  mounted() {
    console.log("log-- el", this.$el);
    this.backgroundColor = new THREE.Color(this.bgColor);

    this.scene = new THREE.Scene();
    this.scene.background = this.backgroundColor;
    const fov = 60;
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.$el.clientWidth / this.$el.clientHeight,
      0.01,
      1000
    );
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.useLegacyLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setClearColor(0xcccccc);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    console.log(
      "log-- width, height",
      this.$el.clientWidth,
      this.$el.clientHeight
    );
    this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    this.neutralEnvironment = this.pmremGenerator.fromScene(
      new RoomEnvironment()
    ).texture;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = -10;
    this.controls.screenSpacePanning = true;
    this.$el.appendChild(this.renderer.domElement);

    // this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
    window.addEventListener("resize", this.resize.bind(this), false);
    this.load();
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);

      this.controls.update();
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    resize() {
      console.log("log-- el", this.$el);
      this.camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
    },
    load() {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      loader.setCrossOrigin("anonymous");
      dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      loader.setDRACOLoader(dracoLoader);
      loader.load(
        `${this.filePath}`,
        (gltf) => {
          const scene = gltf.scene || gltf.scenes[0];
          console.log("log-- gltfscene", scene);
          this.setContent(scene);
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
    },
    setContent(object) {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
      console.log("log-- controls before", this.controls);
      this.controls.reset();
      console.log("log-- controls after", this.controls);
      object.position.x += object.position.x - center.x;
      object.position.y += object.position.y - center.y;
      object.position.z += object.position.z - center.z;
      this.controls.maxDistance = size * 10;
      this.camera.near = size / 100;
      this.camera.far = size * 100;
      this.camera.updateProjectionMatrix();
      this.camera.position.copy(center);
      this.camera.position.x += size / 2.0;
      this.camera.position.y += size / 5.0;
      this.camera.position.z += size / 2.0;
      this.camera.lookAt(center);
      //   this.controls.enabled = true;
      //   this.controls.saveState();
      object.traverse((node) => {
        if (node.isLight) {
          console.log("log-- node is light", node);
        }
      });
      this.scene.add(object);
    },
  },
};
</script>
<style></style>
