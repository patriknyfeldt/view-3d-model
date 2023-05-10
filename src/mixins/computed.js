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
  },
};
