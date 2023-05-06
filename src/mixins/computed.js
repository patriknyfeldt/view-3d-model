/* eslint-disable */

export default {
  name: "computed",
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
    // Returns exposure value from 'settings'.
    exposure() {
      return this.settings.exposure;
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
    // Will be used when emitting or copying settings from gui
    currentSettings() {
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
  },
};
