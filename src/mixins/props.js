/* eslint-disable */

import validateProps from "../utils/validate-props.js";

export default {
  name: "props",
  props: {
    // Path to model
    filePath: {
      type: String,
      required: true,
    },
    // If set to true, an editor will be created to help adjust settings
    useEditor: {
      type: Boolean,
      default: false,
    },
    // An object with settings to control camera, lighting, orbit controls and rotation
    customSettings: {
      type: Object,
      default: () => ({
        // Field of view, defines the extent of the scene that is seen on the display. Set in degrees, defaults to 50.
        fov: 50,
        // Camera position, will be used if x, y and z is provided. Else it will be ignored and default settings will be used
        cameraPosition: {
          x: null,
          y: null,
          z: null,
        },
        // Exposure level, defaults to 1
        // type: Number, min: 0, max: 10
        exposure: 1,
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
      validator: (value) => validateProps(value),
    },
  },
};
