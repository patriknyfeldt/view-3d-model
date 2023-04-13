<template>
  <div v-if="!failedToLoad" class="model-wrapper">
    <div v-if="loading" class="loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
// import * as THREE from "three";
import {
  Scene as Scene,
  PerspectiveCamera as PerspectiveCamera,
  WebGLRenderer as WebGLRenderer,
  sRGBEncoding as sRGBEncoding,
  LinearToneMapping as LinearToneMapping,
  Box3 as Box3,
  Vector3 as Vector3,
  AmbientLight as AmbientLight,
  DirectionalLight as DirectionalLight,
  PMREMGenerator as PMREMGenerator,
  REVISION as REVISION,
} from "three";
import { GLTFLoader as GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls as OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment as RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GUI as GUI } from "lil-gui";

export default {
  name: "ThreeDModel",
  props: {
    filePath: {
      type: String,
      required: true,
    },
    useEditor: {
      type: Boolean,
      default: false,
    },
    customSettings: {
      type: Object,
      default: () => ({
        // Field of view, defines the extent of the scene that is seen on the display. Set in degrees, defaults to 50.
        fov: 50,
        // Camera position, will be used if x, y and z is provided. Else it will be ignored
        cameraPosition: {
          x: null,
          y: null,
          z: null,
        },
        // A light in a specific direction, used to simulate daylight
        // Position is set to x:0, y:1, z:0 meaning that the light shines from the top down.
        // Set intensity and color adjust the light
        directionalLight: {
          intensity: 0.5,
          color: "#FFFFFF",
        },
        // Illuminates the scene equally, without direction, set intensity and color to adjust the light
        ambientLight: {
          intensity: 0.1,
          color: "#FFFFFF",
        },
        // If set to true enables to interact with the model (zoom, grab, rotate), defaults to true
        enableOrbitControls: true,
        // If set to true rotates the model, defaults to false
        autoRotate: false,
        // The rotation speed if autoRotate is set to true, defaults to 2
        rotationSpeed: 2,
      }),
    },
  },
  data: () => ({
    // Camera frustum near plane
    near: 0.1,
    // Camera frustum far plane
    far: 1000,
    // Container dimensions. Will be updated on window.resize
    containerDimensions: {
      width: 0,
      height: 0,
    },
    // loading is set to true until model is loaded
    loading: true,
    // failedtoLoad is set to true if error when loading model
    failedToLoad: false,
  }),
  computed: {
    // Returns The default settings from prop 'customSettings'. Will be used if no value provided in 'customSettings'
    defaultSettings() {
      return this.$options.props.customSettings.default();
    },
    // Returns merged defaultSettings and customSettings, will be used to set up the scene
    settings() {
      return { ...this.defaultSettings, ...this.customSettings };
    },
    // Returns fov value from 'settings'
    fov() {
      return this.settings.fov;
    },
    // Returns cameraPosition object from 'settings'
    cameraPosition() {
      return this.settings.cameraPosition;
    },
    // Returns directionalLight object from 'settings'
    directionalLighting() {
      return this.settings.directionalLight;
    },
    // Returns ambientLight object from 'settings'
    ambientLighting() {
      return this.settings.ambientLight;
    },
    // Returns enableControls value from 'settings'
    enableOrbitControls() {
      return this.settings.enableOrbitControls;
    },
    // Returns autoRotate value from 'settings'
    autoRotate() {
      return this.settings.autoRotate;
    },
    // returns rotationSpeed from 'settings'
    rotationSpeed() {
      return this.settings.rotationSpeed;
    },
    // Returns the current settings att any given moment.
    // will be used when emitting or copying settings from gui
    currentSettings() {
      return {
        fov: this.camera.fov,
        cameraPosition: {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
        },
        directionalLight: {
          intensity: this.directionalLight.intensity,
          color: this.directionalLight.color,
        },
        ambientLight: {
          intensity: this.ambientLight.intensity,
          color: this.ambientLight.color,
        },
        enableOrbitControls: this.orbitControls.enabled,
        autoRotate: this.orbitControls.autoRotate,
        rotationSpeed: this.orbitControls.autoRotateSpeed,
      };
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
    this.createGltfLoader();
    if (this.filePath) {
      this.gltfLoader.load(
        `${this.filePath}`,
        (gltf) => {
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
          console.log(`[view-3d-model] Model loaded`);
          // Create editor if useEditor is set to true
          this.useEditor && this.createEditor();
        },
        // Being executed when loading model
        () => {
          console.log(`[view-3d-model] Loading model`);
        },
        // Setting failedToLoad if error when loading
        (error) => {
          this.loading = false;
          this.failedToLoad = true;
          console.log(
            `[view-3d-model] An error occured when loading asset. ${error}`
          );
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
  methods: {
    // Creating gltfLoader
    // Creating dracoLoader which is used if gltf is compressed with draco

    createGltfLoader() {
      this.gltfLoader = new GLTFLoader();
      this.gltfLoader.setCrossOrigin("anonymous");
      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath(
        `https://unpkg.com/three@0.${REVISION}.x/examples/jsm/libs/draco/gltf/`
      );
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
    },

    // Creating scene, camera and renderer
    initialize() {
      this.scene = new Scene();
      this.camera = new PerspectiveCamera(
        this.fov,
        this.$el.clientWidth / this.$el.clientHeight,
        this.near,
        this.far
      );
      const container = this.$el;
      this.renderer = new WebGLRenderer({
        container,
        antialias: true,
        alpha: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
      this.renderer.outputEncoding = sRGBEncoding;
      this.renderer.toneMapping = LinearToneMapping;
      this.$el.appendChild(this.renderer.domElement);

      window.addEventListener("resize", () => this.onWindowResize(), false);
    },

    // Creating a bounding box from model and returns the size and center
    getCenterAndSize() {
      const box = new Box3().setFromObject(this.model);
      const size = box.getSize(new Vector3()).length();
      const center = box.getCenter(new Vector3());
      return { size, center };
    },

    // Adding lights to the scene
    // Using values from props 'ambientLighting' and 'directionalLigthing'
    setLights() {
      // Setting ambient light color and intensity
      this.ambientLight = new AmbientLight(
        this.ambientLighting?.color,
        this.ambientLighting?.intensity
      );
      this.scene.add(this.ambientLight);

      // Setting directional light color and intensity
      this.directionalLight = new DirectionalLight(
        this.directionalLighting?.color,
        this.directionalLighting?.intensity
      );

      this.scene.add(this.directionalLight);
    },

    // Adding an environment to the scene, to provide an even lighting to the scene
    setEnvironment() {
      this.pmremGenerator = new PMREMGenerator(this.renderer);
      this.pmremGenerator.compileEquirectangularShader();
      this.environment = this.pmremGenerator.fromScene(
        new RoomEnvironment()
      ).texture;

      this.scene.environment = this.environment;
    },

    // Adding orbit controls to be able to interact with the model, enabled if enableOrbitControls is set to true
    setControls(size) {
      this.orbitControls = new OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.orbitControls.enabled = this.enableOrbitControls;
      this.orbitControls.maxDistance = size * 10;
    },

    // Adding rotation if autoRotate is set to true and rotation speed
    setRotation() {
      this.orbitControls.autoRotate = this.autoRotate;
      this.orbitControls.autoRotateSpeed = this.rotationSpeed;
    },

    // Centering the loaded model
    centerModel(center) {
      this.model.position.x += this.model.position.x - center.x;
      this.model.position.y += this.model.position.y - center.y;
      this.model.position.z += this.model.position.z - center.z;
    },

    // Setting the camera position
    setCamera(size, center) {
      this.camera.near = size / 100;
      this.camera.far = size * 100;
      this.updateCamera();

      // Using camera position values if provided in customSettings
      if (
        this.cameraPosition.x &&
        this.cameraPosition.y &&
        this.cameraPosition.z
      ) {
        this.camera.position.x = this.cameraPosition.x;
        this.camera.position.y = this.cameraPosition.y;
        this.camera.position.z = this.cameraPosition.z;
      }

      // Else using size to set camera position (This is the default behavior)
      else {
        this.camera.position.x += size / 1.5;
        this.camera.position.y += size / 3;
        this.camera.position.z += size / 1.5;
      }
      // Point camera at center of the scene
      this.camera.lookAt(center);
    },

    // Updating camera projectionMatrix
    updateCamera() {
      this.camera.updateProjectionMatrix();
    },

    // Adding animation loop
    animate() {
      window.requestAnimationFrame(this.animate);
      this.render();
      if (this.orbitControls) {
        this.orbitControls.update();
      }
    },

    // Renders the scene and camera
    render() {
      this.renderer.render(this.scene, this.camera);
    },

    // Updating camera aspect ratio, projectionMatrix and renderers size
    updateCameraAndRenderer(dimensions) {
      const { width, height } = dimensions;
      this.camera.aspect = width / height;
      this.updateCamera();
      this.renderer.setSize(width, height);
    },

    // Updating container dimensions when resizing window
    onWindowResize() {
      const element = this.$el;
      if (element.clientWidth !== 0 && element.clientHeight !== 0) {
        this.containerDimensions = {
          width: element.clientWidth,
          height: element.clientHeight,
        };
      }
    },

    // Emitting current settings
    handleEmit() {
      this.$emit("clicked", this.currentSettings);
    },

    // Copies a ThreeDModel component with current settings to clipboard
    async handleCopy() {
      const settings = JSON.stringify(this.currentSettings).replaceAll('"', "");
      const component = `
      <ThreeDModel
        class="${this.$el.classList.value}"
        file-path="${this.filePath}"
        :custom-settings="${settings}"/>`;
      try {
        await navigator.clipboard.writeText(component);
        alert("Copied to clipboard");
      } catch (err) {
        alert("failed to copy");
      }
    },

    // Creating GUI to help adjusting the model
    createEditor() {
      this.gui = new GUI();

      // Camera folder
      const cameraFolder = this.gui.addFolder("Camera");
      // Fov
      cameraFolder
        .add(this.camera, "fov", 1, 180)
        .name("fov")
        .onChange(this.updateCamera);

      // Camera position folder
      const cameraPositionFolder = cameraFolder.addFolder("Camera Position");

      // Camera position x
      cameraPositionFolder.add(this.camera.position, "x", -25, 25).listen();
      // Camera position y
      cameraPositionFolder.add(this.camera.position, "y", -25, 25).listen();
      // Camera position z
      cameraPositionFolder.add(this.camera.position, "z", -25, 25).listen();

      // Lights folder
      const lightsFolder = this.gui.addFolder("Light");

      // Exposure
      lightsFolder
        .add(this.renderer, "toneMappingExposure", 0, 10)
        .name("Exposure");

      // Directional light folder
      const directionalLightFolder =
        lightsFolder.addFolder("Directional Light");
      // Intensity
      directionalLightFolder.add(this.directionalLight, "intensity", 0, 100);
      // Color
      directionalLightFolder.addColor(this.directionalLight, "color");

      // Ambient light folder
      const ambientLightFolder = lightsFolder.addFolder("Ambient Light");
      // Intensity
      ambientLightFolder.add(this.ambientLight, "intensity", 0, 100);
      // Color
      ambientLightFolder.addColor(this.ambientLight, "color");

      // Orbit controls folder
      const orbitControlsFolder = this.gui.addFolder("Orbit Controls");

      // Enable/Disable Orbit controls
      orbitControlsFolder
        .add(this.orbitControls, "enabled")
        .name("Enable Orbit Controls");

      // Enable/Disable Auto Rotate
      orbitControlsFolder
        .add(this.orbitControls, "autoRotate")
        .name("Auto Rotate");

      // Auto Rotation Speed
      orbitControlsFolder
        .add(this.orbitControls, "autoRotateSpeed", 0.5, 100)
        .name("Rotation Speed");

      // Buttons
      // Emit button, runs method/handleEmit when clicked
      this.gui.add(this, "handleEmit").name("Emit Settings");
      // Copy button, runs method/handleCopy when clicked
      this.gui.add(this, "handleCopy").name("Copy Settings");
    },
  },
};
</script>

<style>
.model-wrapper {
  position: relative;
}
.loader {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
  width: 80px;
  height: 80px;
}

.loader div {
  background-color: white;
  mix-blend-mode: difference;
  position: absolute;
  opacity: 1;
  border-radius: 50%;
  animation: loading-spinner 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.loader div:nth-child(2) {
  animation-delay: -0.4s;
}
.loader div:nth-child(3) {
  animation-delay: -0.8s;
}

@keyframes loading-spinner {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
