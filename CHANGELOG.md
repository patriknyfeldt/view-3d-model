## [1.3.1] 2023-05-12

### Added

- Update docs

## [1.3.0] 2023-05-11

### Added

- Added damping to `orbitControls` to give a sense of weight when interacting with the model.

## [1.2.4] 2023-05-10

### Fixed

- Replaced computed property `currentSettings` with method `getCurrentsettings` to prevent reactivity bug.

## [1.2.3] 2023-05-06

### Removed

- Unused data property `containerDimensions`.

## [1.2.2] 2023-05-06

### Changed

- Split up code for readabilility

## [1.2.1] 2023-04-24

### Removed

- Removed unnecessary watcher for container dimensions. Call `updateCameraAndRenderer` directly from `onWindowResize` instead.

### Changed

- Moved styles to `style.css`

## [1.2.0] 2023-04-23

### Added

- `exposure` to `customSettings`

- New chapter to docs: Control `ThreeDModel` with CSS

## [1.1.4] 2023-04-21

### Fixed

- Prevent duplicated class names in copied template.

### Changed

- 'Copied to clipboard' msg instead of alert when clicking Copy as Template button.

## [1.1.3] 2023-04-20

### Added

- Update docs

## [1.1.2]

### Added 2023-04-20

- Update docs

## [1.1.1] 2023-04-19

### Fixed

- Disabled eslint in `custom-logs.js` and `validate-props.js`

## [1.1.0] 2023-04-19

### Added

- Checking if extension `KHR_materials_unlit` is being used in the gltf.
  If so, no light intensity or color settings will be applicable.
  No inputs for these values are created in the editor.

- Checking if extension `KHR_materials_pbrSpecularGlossiness` is being used.
  Since the extension is not supported a warning message will show in the console.

### Fixed

- Prevented customized console logs when running in 'production' mode.

### Changed

- Moved validation to `utils/validate-props`

## [1.0.6] - 2023-04-18

### Added

- Documentation
- `filePath` to object in $emit event `useSettings`

### Fixed

- Issue with loader animation

### Changed

- Name of editor button `Copy as Component` to `Copy as Template`

## [1.0.5] - 2023-04-17

### Added

- Documentation, more to come

## [1.0.4] - 2023-04-15

### Fixed

- Update package.json

## [1.0.3] - 2023-04-15

### Fixed

- Issues with missing files

## [1.0.2] - 2023-04-15

### Added

- Validation for prop `customSettings`.
- Customized log messages `msg`, `warn` & `error`.
- `reset` button in editor.

### Changed

- Name of `$emit` event `clicked`. Now called `useSettings`.
- Folder structure in editor.

## [1.0.1] - 2023-04-13

### Added

- Loader animation when loading model.

### Fixed

- Not rendering component if loading failes.

### Changed

- Only importing necessary components from three.js library

## [1.0.0] - 2023-04-11

### Added

- Component `ThreeDModel`, for rendering gltf(glb) 3d models.

<!--
Template

### Added

### Fixed

### Changed

### Deprecated

### Removed

-->
