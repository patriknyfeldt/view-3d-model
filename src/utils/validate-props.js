/* eslint-disable */
import { Color as Color } from "three";
import log from "./view-3d-model-logs.js";
export default (value) => {
  // validating fov value is type 'Number' and between 1 and 180
  const fov = value?.fov;

  if ((fov && typeof fov !== "number") || fov < 1 || fov > 180) {
    log.warn(
      "Invalid fov value in prop customSettings/fov. Should be type 'Number' between 1 and 180."
    );
    return false;
  }

  // Validating cameraPosition values
  const x = value?.cameraPosition?.x ?? null;
  const y = value?.cameraPosition?.y ?? null;
  const z = value?.cameraPosition?.z ?? null;
  // If some of the values x, y, z is declared but not all of them, default settings will be used.
  if ((x || y || z) && (!x || !y || !z)) {
    log.warn(
      `Looks like some of values x, y, z is declared in prop customSettings/cameraPosition. Please note that if not all values x, y, z is provided default camera settings will be used.`
    );
  }
  // Validating cameraPosition values are type 'Number' and between -50 and 50
  if (
    (x && typeof x !== "number") ||
    (x && x < -50) ||
    x > 50 ||
    (y && typeof y !== "number") ||
    (y && y < -50) ||
    y > 50 ||
    (z && typeof z !== "number") ||
    (z && z < -50) ||
    z > 50
  ) {
    log.warn(
      "Invalid position value in prop customSettings/cameraPosition. Values x, y, z should be type 'Number' between -50 and 50"
    );
    return false;
  }
  // Validating directionalLight values

  // Declaring directionalLight/color value as THREE.Color to trigger warning if unknown.
  new Color(value?.directionalLight?.color);
  // Validating directionalLight/intensity value is type 'Number' and between 0 and 100
  const directionalLightIntesity = value?.directionalLight?.intensity;

  if (
    (directionalLightIntesity &&
      typeof directionalLightIntesity !== "number") ||
    directionalLightIntesity < 0 ||
    directionalLightIntesity > 100
  ) {
    log.warn(
      "Invalid intensity value in prop customSettings/directionalLight. Should be type 'Number' between 0 and 100"
    );
    return false;
  }

  // Declaring ambientLight/color value as THREE.Color to trigger warning if unknown.
  new Color(value?.ambientLight?.color);
  // Validating ambientLight/intensity value is type 'Number' and between 0 and 100
  const ambientLightIntensity = value?.ambientLight?.intensity;

  if (
    (ambientLightIntensity && typeof ambientLightIntensity !== "number") ||
    ambientLightIntensity < 0 ||
    ambientLightIntensity > 100
  ) {
    log.warn(
      "Invalid intensity value in prop customSettings/ambientLight. Should be type 'Number' between 0 and 100"
    );
    return false;
  }

  // Validating enableOrbitControls value
  const enableOrbitControls = value?.enableOrbitControls;

  if (enableOrbitControls && typeof enableOrbitControls !== "boolean") {
    log.warn(
      "Invalid value in prop customSettings/enableOrbitControls. Should be type 'Boolean'"
    );
    return false;
  }
  // Validating autorotate value
  const autoRotate = value?.autoRotate;

  if (autoRotate && typeof autoRotate !== "boolean") {
    log.warn(
      "Invalid value in prop customSettings/autoRotate. Should be type 'Boolean'"
    );
    return false;
  }

  // Validating rotationSpeed value
  const rotationSpeed = value?.rotationSpeed;

  if (
    (rotationSpeed && typeof rotationSpeed !== "number") ||
    rotationSpeed < 0.1 ||
    rotationSpeed > 100
  ) {
    log.warn("Invalid value in prop customSettings/rotationSpeed");
    return false;
  }

  return true;
};
