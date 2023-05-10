/* eslint-disable */

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
  name: "methods",
  methods: {
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
      this.renderer.toneMappingExposure = this.exposure;
      this.$el.appendChild(this.renderer.domElement);

      window.addEventListener("resize", () => this.onWindowResize(), false);
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

    // Adding animation loop
    animate() {
      window.requestAnimationFrame(this.animate);
      this.render();
      if (this.orbitControls) {
        this.orbitControls.update();
      }
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

    // Creating gltfLoader
    // Creating dracoLoader which is used if gltf is compressed with draco
    createLoader() {
      this.gltfLoader = new GLTFLoader();
      this.gltfLoader.setCrossOrigin("anonymous");
      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath(
        `https://unpkg.com/three@0.${REVISION}.x/examples/jsm/libs/draco/gltf/`
      );
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
    },

    // Setting isUnlit to true if method/usingUnllit returns true
    // If so, no lights will be applicable
    checkExtensions(extensions, extensionsUsed) {
      this.isUnlit = this.usingUnlit(extensions, extensionsUsed);
      this.isUnlit &&
        log.msg(
          "This model was created using extension 'KHR_materials_unlit', hence no lights will be applicable. Read more about 'KHR_materials_unlit: ' https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_unlit/README.md"
        );

      // Logs a warning if method/usingSpecGloss returns true
      if (this.usingSpecGloss(extensions, extensionsUsed)) {
        log.warn(
          "This model was created using extension 'KHR_materials_pbrSpecularGlossiness'. This extension is not supported and hence the model might not appear correct. Read more about 'KHR_materials_pbrSpecularGlossiness': https://www.donmccurdy.com/2022/11/28/converting-gltf-pbr-materials-from-specgloss-to-metalrough/"
        );
      }
    },

    // Returns true or false depending on if extension 'KHR_materials_unlit' is used.
    usingUnlit(extensions, extensionsUsed) {
      return !!(
        extensions?.KHR_materials_unlit ||
        extensionsUsed?.includes("KHR_materials_unlit")
      );
    },

    // Returns true or false depending on if extension 'KHR_materials_pbrSpecularGlossiness' is used.
    usingSpecGloss(extensions, extensionsUsed) {
      return !!(
        extensions?.KHR_materials_pbrSpecularGlossiness ||
        extensionsUsed?.includes("KHR_materials_pbrSpecularGlossiness")
      );
    },

    // Creating a bounding box from model and returns the size and center
    getCenterAndSize() {
      const box = new Box3().setFromObject(this.model);
      const size = box.getSize(new Vector3()).length();
      const center = box.getCenter(new Vector3());
      return { size, center };
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

    // Updating camera projectionMatrix
    updateCamera() {
      this.camera.updateProjectionMatrix();
    },

    // Renders the scene and camera
    render() {
      this.renderer.render(this.scene, this.camera);
    },

    // Updating camera aspect ratio, projectionMatrix and renderers size
    updateCameraAndRenderer() {
      this.camera.aspect = this.$el.clientWidth / this.$el.clientHeight;
      this.updateCamera();
      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
    },

    // Runs updateCameraAndRenderer on window resize
    onWindowResize() {
      this.updateCameraAndRenderer();
    },

    // Returns the current settings att any given moment.
    // Will be used when emitting or copying settings from editor
    getCurrentSettings() {
      return {
        fov: this.camera.fov,
        cameraPosition: {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
        },
        exposure: this.renderer.toneMappingExposure,
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

    // Emitting current settings
    handleUseSettings() {
      this.$emit("useSettings", {
        filePath: this.filePath,
        customSettings: this.getCurrentSettings(),
      });
    },

    // Copies a ThreeDModel template with current settings to clipboard
    async handleCopy() {
      const settings = JSON.stringify(this.getCurrentSettings()).replaceAll(
        '"',
        ""
      );
      const classList = this.$el.classList.value;
      const component = `
      <ThreeDModel
      class="${classList.replace("model-wrapper", "")}"
      file-path="${this.filePath}"
      :custom-settings="${settings}"/>`;
      try {
        await navigator.clipboard.writeText(component);
        this.triggerCopyMsg();
      } catch (err) {
        alert("failed to copy");
      }
    },

    // Setting 'showCopyMsg' to true for one second
    triggerCopyMsg() {
      this.showCopyMsg = true;
      setTimeout(() => {
        this.showCopyMsg = false;
      }, 1000);
    },

    // Resets all values in Editor
    resetEditor() {
      this.gui.reset();
    },

    // Creating GUI to help adjusting the model
    createEditor() {
      this.gui = new GUI();
      this.gui.title("Editor");

      // Camera folder
      const cameraFolder = this.gui.addFolder("Camera").close();
      // Fov
      cameraFolder
        .add(this.camera, "fov", 1, 180)
        .name("fov")
        .onChange(this.updateCamera);

      // Camera position folder
      const cameraPositionFolder = cameraFolder
        .addFolder("Camera Position")
        .close();

      // Camera position x
      cameraPositionFolder.add(this.camera.position, "x", -50, 50).listen();
      // Camera position y
      cameraPositionFolder.add(this.camera.position, "y", -50, 50).listen();
      // Camera position z
      cameraPositionFolder.add(this.camera.position, "z", -50, 50).listen();

      // Lights folder
      const lightsFolder = this.gui.addFolder("Light").close();

      // Exposure
      lightsFolder
        .add(this.renderer, "toneMappingExposure", 0, 10)
        .name("Exposure");

      // Creating controls for directionalLight and ambientLight if not using extension 'KHR_materials_unlit'
      if (!this.isUnlit) {
        // Directional light folder
        const directionalLightFolder = lightsFolder
          .addFolder("Directional Light")
          .close();
        // Intensity
        directionalLightFolder.add(this.directionalLight, "intensity", 0, 100);
        // Color
        directionalLightFolder.addColor(this.directionalLight, "color");

        // Ambient light folder
        const ambientLightFolder = lightsFolder
          .addFolder("Ambient Light")
          .close();
        // Intensity
        ambientLightFolder.add(this.ambientLight, "intensity", 0, 100);
        // Color
        ambientLightFolder.addColor(this.ambientLight, "color");
      }

      // Orbit controls folder
      const orbitControlsFolder = this.gui.addFolder("Orbit Controls").close();

      // Enable/Disable Orbit controls
      orbitControlsFolder
        .add(this.orbitControls, "enabled")
        .name("Enable Orbit Controls");

      // Rotation folder
      const rotationFolder = this.gui.addFolder("Rotation").close();

      // Enable/Disable Auto Rotate
      rotationFolder.add(this.orbitControls, "autoRotate").name("Auto Rotate");

      // Auto Rotation Speed
      rotationFolder
        .add(this.orbitControls, "autoRotateSpeed", 0.1, 100)
        .name("Rotation Speed");

      // Buttons
      // Reset button, runs
      this.gui.add(this, "resetEditor").name("Reset");
      // Copy button, runs method/handleCopy when clicked
      this.gui.add(this, "handleCopy").name("Copy as Template");
      // Emit button, runs method/handleEmit when clicked
      this.gui.add(this, "handleUseSettings").name("Use Settings");
    },
  },
};
