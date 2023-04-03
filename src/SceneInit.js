// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// export default class SceneInit {
//   constructor(canvasId, wrapperId) {
//     this.scene = undefined;
//     this.camera = undefined;
//     this.renderer = undefined;

//     this.fov = 60;
//     this.nearPlane = 0.1;
//     this.farPlane = 1000;
//     this.canvasId = canvasId;
//     this.wrapperId = wrapperId;

//     this.clock = undefined;
//     this.orbitControls = undefined;

//     this.ambientLight = undefined;
//     this.directionalLight = undefined;

//     this.pmremGenerator = undefined;
//     this.environment = undefined;
//   }

//   initialize(width, height) {
//     // console.log("log-- initialize width", width);
//     // console.log("log-- initialize", height);
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(
//       this.fov,
//       width / height,
//       // window.innerWidth / window.innerHeight,
//       // 0.01,
//       // 1000
//       this.nearPlane,
//       this.farPlane
//     );

//     // console.log("log-- camera", this.camera);

//     const canvas = document.getElementById(this.canvasId);
//     this.renderer = new THREE.WebGLRenderer({
//       canvas,
//       antialias: true,
//       alpha: true,
//     });

//     this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
//     this.pmremGenerator.compileEquirectangularShader();
//     this.environment = this.pmremGenerator.fromScene(
//       new RoomEnvironment()
//     ).texture;

//     // console.log("log-- environment", this.environment);
//     this.scene.environment = this.environment;

//     this.renderer.setSize(width, height);

//     // this.renderer.setSize(window.innerWidth, window.innerHeight);
//     const wrapper = document.getElementById(this.wrapperId);
//     wrapper.appendChild(this.renderer.domElement);

//     // this.clock = new THREE.Clock();
//     this.orbitControls = new OrbitControls(
//       this.camera,
//       this.renderer.domElement
//     );
//     // console.log("log-- maxDistance", this.orbitControls.maxDistance);
//     this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
//     this.ambientLight.castShadow = true;
//     this.scene.add(this.ambientLight);

//     this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//     this.directionalLight.position.set(45, 45, 45);
//     this.scene.add(this.directionalLight);

//     window.addEventListener(
//       "resize",
//       () => this.onWindowResize(width, height),
//       false
//     );

//     // this.scene.background = new THREE.Color(0xdddddd);
//   }

//   setControls(size) {
//     // console.log("log-- size", size);
//     this.orbitControls.maxDistance = size * 10;
//     // console.log(
//     //   "log-- maxDistance from setControls",
//     //   this.orbitControls.maxDistance
//     // );
//   }

//   setCamera(size, center) {
//     this.camera.near = size / 100;
//     this.camera.far = size * 100;
//     this.camera.updateProjectionMatrix();
//     this.camera.position.copy(center);
//     this.camera.position.x += size / 1.5;
//     this.camera.position.y += size / 3;
//     this.camera.position.z += size / 1.5;

//     // this.camera.position.x += size;
//     // this.camera.position.y += size / 2.5;
//     // this.camera.position.z += size;

//     this.camera.lookAt(center);

//     // console.log("log-- camera from setCamera", this.camera);
//   }

//   rotate() {
//     // this.scene.rotation.x += 0.01;
//     this.scene.rotation.y += 0.01;
//     // this.scene.rotation.z += 0.01;
//     requestAnimationFrame(this.rotate.bind(this));
//   }

//   animate() {
//     window.requestAnimationFrame(this.animate.bind(this));
//     this.render();
//     this.orbitControls.update();
//   }

//   render() {
//     this.renderer.render(this.scene, this.camera);
//   }

//   onWindowResize(width, height) {
//     this.camera.aspect = width / height;

//     // this.camera.aspect = window.innerWidth / window.innerHeight;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setSize(width, height);
//   }
// }
