/* eslint-disable */

export default {
  name: "data",
  data: () => ({
    // Camera frustum near plane
    near: 0.1,
    // Camera frustum far plane
    far: 1000,
    // loading is set to true until model is loaded
    loading: true,
    // failedtoLoad is set to true if error when loading model
    failedToLoad: false,
    // isUnlit will be set to true if extension 'KHR_materials_unlit' is used.
    // If so, no color and intensity settings will be applicable in directionalLight or ambientLight.
    isUnlit: false,
    // Is set true when clicking button 'copy as template'
    showCopyMsg: false,
  }),
};
