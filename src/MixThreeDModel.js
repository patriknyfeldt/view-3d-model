import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default {
  name: "MixThreeDModel",
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // Creating gltfLoader and dracoLoader which is used if gltf is compressed with draco
    createGltfLoader() {
      this.gltfLoader = new GLTFLoader();
      this.dracoLoader = new DRACOLoader();
      this.gltfLoader.setCrossOrigin("anonymous");
      this.dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
    },
    // Creating scene, camera and renderer
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
    // Creating a bounding box from gltfScene and returns the size and center
    getCenterAndSize() {
      const box = new THREE.Box3().setFromObject(this.gltfScene);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
      return { size, center };
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
      //   const helper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
      //   this.scene.add(helper);

      this.scene.add(this.directionalLight);
    },
    // Adding an environment to the scene, to provide even light
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
    // Centering the loaded model
    centerModel(center) {
      this.gltfScene.position.x += this.gltfScene.position.x - center.x;
      this.gltfScene.position.y += this.gltfScene.position.y - center.y;
      this.gltfScene.position.z += this.gltfScene.position.z - center.z;
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
