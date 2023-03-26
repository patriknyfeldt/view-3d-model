<template>
  <canvas id="model"></canvas>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import SceneInit from "../lib/SceneInit";

export default {
  name: "ThreeDModel",
  props: {
    modelName: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    // filePath() {
    //   return `/assets/${this.fileName}/scene.gltf`;
    // },
  },
  mounted() {
    console.log("log-- modelName", this.modelName);
    console.log("log-- filePath", this.filePath);
    this.filePath = `/assets/${this.fileName}/scene.gltf`;
    const model = new SceneInit("model");
    console.log("log-- model", model);
    model.initialize();
    model.animate();

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    gltfLoader.setCrossOrigin("anonymous");
    dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/assets/car/scene.gltf",
      (gltfScene) => {
        loadedModel = gltfScene;
        const { scene } = gltfScene;
        const box = new THREE.Box3().setFromObject(scene);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());
        console.log("log-- box", box);
        console.log("log-- size", size);
        console.log("log-- center", center);
        // scene.position.x += scene.position.x - center.x;
        // scene.position.y += scene.position.y - center.y;
        // scene.position.z += scene.position.z - center.z;
        model.setControls(size);
        model.setCamera(size, center);
        // this.controls.maxDistance = size * 10;
        // this.defaultCamera.near = size / 100;
        // this.defaultCamera.far = size * 100;
        // this.defaultCamera.updateProjectionMatrix();

        // if (this.options.cameraPosition) {
        //   this.defaultCamera.position.fromArray(this.options.cameraPosition);
        //   this.defaultCamera.lookAt(new Vector3());
        // } else {
        //   this.defaultCamera.position.copy(center);
        //   this.defaultCamera.position.x += size / 2.0;
        //   this.defaultCamera.position.y += size / 5.0;
        //   this.defaultCamera.position.z += size / 2.0;
        //   this.defaultCamera.lookAt(center);
        // }

        // var box = new THREE.Box3().setFromObject(scene);
        // var center = new THREE.Vector3();
        // box.getCenter(center);
        // scene.position.sub(center); // center the model
        // console.log("log-- loadedModel", loadedModel);
        // console.log("log-- animations", loadedModel.animations);
        // console.log("log-- asset", loadedModel.asset);
        // console.log("log-- cameras", loadedModel.cameras);
        // console.log("log-- parser", loadedModel.parser);
        console.log("log-- scene", loadedModel.scene);
        console.log("log-- location", location);
        // console.log("log-- scenes", loadedModel.scenes);
        // console.log("log-- userData", loadedModel.userData);

        // loadedModel.scene.rotation.y = Math.PI / 8;
        // loadedModel.scene.position.set(0, 0, 0);
        // loadedModel.scene.up.set(0, 0, 0);
        // loadedModel.scene.position.y = 1;
        // loadedModel.scene.scale.set(5, 5, 5);

        model.scene.add(scene);
      },
      (xhr) => {
        console.log("log-- ", xhr);
      },
      (error) => {
        console.log("log-- an error occured", error);
      }
    );

    const animate = () => {
      if (loadedModel) {
        // loadedModel.scene.rotation.x += 0.01;
        // loadedModel.scene.rotation.y += 0.01;
        // loadedModel.scene.rotation.z += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
  },
  methods: {},
};
</script>

<style></style>
