import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class SceneInit {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    this.fov = 60;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    this.clock = undefined;
    this.controls = undefined;

    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );

    console.log("log-- camera", this.camera);

    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    console.log("log-- maxDistance", this.controls.maxDistance);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight.position.set(50, 50, 64);
    this.scene.add(this.directionalLight);

    window.addEventListener("resize", () => this.onWindowResize(), false);

    this.scene.background = new THREE.Color(0xdddddd);
  }

  setControls(size) {
    console.log("log-- size", size);
    this.controls.maxDistance = size * 10;
    console.log(
      "log-- maxDistance from setControls",
      this.controls.maxDistance
    );
  }

  setCamera(size, center) {
    this.camera.near = size / 100;
    this.camera.far = size * 100;
    this.camera.updateProjectionMatrix();
    this.camera.position.copy(center);
    this.camera.position.x += size;
    this.camera.position.y += size / 2.5;
    this.camera.position.z += size;

    this.camera.lookAt(center);

    console.log("log-- camera from setCamera", this.camera);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
