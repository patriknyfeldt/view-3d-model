# view-3d-model

[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads-per-month]][npm-trends]

**_view-3d-model_** is a `Vue.js` library that makes use of `three.js` and `GLTFLoader` to allow users to display 3D models in their `Vue.js` applications.

This can be achieved by importing the `ThreeDModel` component from the library, which supports models in `gltf` format, as well as the binary version of `gltf`, which is `glb`.

```
npm install view-3d-model
```

```html
<script setup>
  import ThreeDModel from "view-3d-model";
</script>

<template>
  <div class="wrapper">
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
      :use-editor="true"
      :custom-settings="{
      autoRotate: true
    }"
    />
  </div>
</template>

<style>
  .wrapper {
    height: 100vh;
    width: 100vw;
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

## Chapters

This documentation includes the following chapters:

<details>
<summary>Get Started</summary>

- [Get Started](#get-started)
  - [Prerequisites](#pre-requisites)
  - [Start using **_view-3d-model_**](#start-using-view-3d-model)
  - [Create a folder for your models](#create-folder-for-models)
  - [Using `glb`](#using-glb)
  - [Using `gltf`](#using-gltf)
  - [Install **_view-3d-model_**](#install-view-3d-model)
  - [Import and use the `ThreeDModel` in Vue.js projects](#import-and-use-vue)
  - [Import and use the `ThreeDModel` in Nuxt.js projects](#import-and-use-nuxt)

</details>

<details>
<summary>Using ThreeDModel</summary>

- [Using `ThreeDModel`](#using-three-d-model)
  - [Short on props in Vue.js](#short-on-props)

</details>

<details>
<summary>Customize `ThreeDModel` with props</summary>

- [Customize `ThreeDModel` with props](#customize-three-d-model-with-props)
  - [filePath](#file-path)
  - [customSettings](#custom-settings)
  - [useEditor](#use-editor)

</details>

<details>

<summary>Control `ThreeDModel` with CSS</summary>

- [Control `ThreeDModel` with CSS](#control-three-d-model-with-css)
  - [Set width and height](#set-width-and-height)
  - [Set background](#set-background)

</details>

<details>
<summary>Extensions</summary>

- [Extensions](#extensions)
  - [Supported extensions](#supported-extensions)

</details>

<details>
<summary>Troubleshooting</summary>

- [TroubleShooting](#trouble-shooting)
  - [My 3d model doesn't show up](#model-not-showing-up)
  - [I can't set the lights](#cant-set-lights)
  - [My model is not looking correct](#not-looking-correct)

</details>

<details>
<summary>Create a Vue.js Project</summary>

- [Create a Vue.js Project](#create-vue-project)
  - [Follow these steps to create a Vue.js application:](#steps-to-create-vue)

</details>

<details>
<summary>ThreeDModel</summary>

- [ThreeDModel](#three-d-model)
  - [Props](#props)
  - [Events](#events)
  - [Methods](#methods)

</details>

## <a id="get-started"></a> Get Started

### <a id="pre-requisites"></a> Prerequisites

To use **_view-3d-model_** you will need a `Vue.js` project (or a `Nuxt` project), and a `gltf(glb)` file.

- If you are unfamiliar to the `Vue.js` javascript framework,
  [see this guide to create a Vue.js project](#create-vue-project)

- If you don't have a `gltf(glb)` file, there are plenty of free downloads on the web. For example you can visit [Sketchfab](https://sketchfab.com/features/free-3d-models), and download a 3d-model of your liking.
  Make sure that you choose the file format `gltf` or `glb`.

:information_source: <b>The `glb` version usually is about 30% smaller than the `gltf` version and thus recommended to use if possible.</b>

### <a id="start-using-view-3d-model"></a> Start using **_view-3d-model_**

When you have a `glb` or `gltf` file, and a `Vue.js` project (or a `Nuxt` project), follow these steps to start using **_view-3d-model_**:

### <a id="create-folder-for-models"></a> Create a folder for your models

- Lets create a folder called `models` inside the `public` folder.

:information_source: <b>If you are using `Nuxt` use the `static` folder instead of `public`.</b>

### <a id="using-glb"></a> Using `glb`

- If you have a model of the format `glb`, you can simply add the file to the `models` folder as it is:

```
your-project/
...
    public/                              // Use static folder if using Nuxt
        models/
            name-of-your-model.glb
...
```

### <a id="using-gltf"></a> Using `gltf`

- If you have a model of the format `gltf`, you'll notice that it consists of a number of different items. Usually there is a `texture folder` or a number of image files, a `bin` file, a `license.txt` file and a `gltf` file. Create a folder with the name of your model inside the `models` folder, and add all the contents of the `gltf` file to this folder.

Your project should look something like this:

```
your-project/
...
    public/                             // Use static folder if using Nuxt
        models/
            name-of-your-model/
                textures
                license.txt
                scene.bin
                scene.gltf

...

```

### <a id="install-view-3d-model"></a> Install **_view-3d-model_**

- Install **_view-3d-model_** by typing the following in the command line:

```
npm install view-3d-model
```

### <a id="import-and-use-vue"></a> Import and use the `ThreeDModel` component in Vue.js projects

**_[Click here to see how to import and use `ThreeDModel` in Nuxt project](#import-and-use-nuxt)_**

Follow these steps to import and use the `ThreeDModel` component in your `Vue.js` project:

In `App.vue`, or any other component where you want to use `ThreeDModel`:

Using `Composition API (Vue 3)`:

```html
<script setup>
  // import the ThreeDModel component from view-3d-model
  import ThreeDModel from "view-3d-model";
</script>

<template>
  <div class="wrapper">
    <!-- If using glb format -->
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />

    <!-- If using gltf format -->
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name/scene.gltf"
    />
  </div>
</template>
<!-- In this example we set the width and height to match the viewport. -->
<style>
  .wrapper {
    height: 100vh;
    width: 100vw;
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

Using `Options API (Vue 2)`:

```html
<template>
  <div class="wrapper">
    <!-- If using glb format -->
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />

    <!-- If using gltf format -->
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name/scene.gltf"
    />
  </div>
</template>

<script>
  // import the ThreeDModel component from view-3d-model
  import ThreeDModel from "view-3d-model";
  export default {
    name: "nameOfYourComponent",
    // Declare ThreeDModel in component options
    components: {
      ThreeDModel,
    },
  };
</script>
<!-- In this example we set the width and height to match the viewport. -->
<style>
  .wrapper {
    height: 100vh;
    width: 100vw;
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

To make `ThreeDModel` available globally throughout your `Vue.js` project add this to `main.js`:

```js title="src/main.js"
import { createApp } from "vue";
import App from "./App.vue";
// Import ThreeDModel from view-3d-model
import ThreeDModel from "view-3d-model";

createApp(App)
  // Register ThreeDModel as global component
  .component("ThreeDModel", ThreeDModel)
  .mount("#app");
```

Now you can use `ThreeDModel` wherever you want in your `Vue.js` project without importing it in your components.
**_[Click here to see how to start using `ThreeDModel`](#using-three-d-model)_**

### <a id="import-and-use-nuxt"></a> Import and use the `ThreeDModel` component in Nuxt.js projects

- If you haven't already done so, install **_view-3d-model_** by typing the following in the command line:

```
npm install view-3d-model
```

- In the `plugins` folder create a file called `view-3d-model.js`.

- Copy and paste the following into `plugins/view-3d-model.js`:

```js title="view-3d-model.js"
import Vue from "vue";
import ThreeDModel from "view-3d-model";

Vue.component("ThreeDModel", {
  extends: ThreeDModel,
});
```

- In `nuxt.config.js`, add the following to the `plugins` array:

```js title="nuxt.config.js"
...
    plugins: [
        ...
            {src: '~/plugins/view-3d-model.js', mode: 'client'}
        ...
    ]
...
```

- Also in `nuxt.config.js`, add **_view-3d-model_** to `build.transpile`:

```js title="nuxt.config.js"
...
  build: {
    ...
      transpile: ['view-3d-model']
    ...
  }
...
```

Now `ThreeDModel` is available globally throughout your `Nuxt` project without importing it in your components like so:

```html
<template>
    <!-- If using glb format -->
    <client-only>
      <div class="wrapper">
        <ThreeDModel
          class="three-d-model"
          file-path="./models/your-model-name.glb"
        />
      </div>
    </client-only>

    <!-- If using gltf format -->
    <client-only>
      <div class="wrapper">
        <ThreeDModel
          class="three-d-model"
          file-path="./models/your-model-name/scene.gltf"
        />
    </client-only>

</template>

<script>
  export default {
    name: "nameOfYourComponent",
  };
</script>
<!-- In this example we set the width and height to match the viewport. -->
<style>
  .wrapper {
    height: 100vh;
    width: 100vw;
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

## <a id="using-three-d-model"></a> Using `ThreeDModel`

By now you should have a 3d model rendered to the screen. Now let's take a look at how you can adjust the settings of the model via props.

### <a id="short-on-props"></a> Short on props in Vue.js

- `ThreeDModel` takes three props: `filePath`, `useEditor` and `customSettings`. When we're passing props to a Vue component we typically do so in `kebab-case`, so in this guide we will be following that convention.
  (As in the examples above when we're passing the `filePath` prop, we do so like this: `file-path="./models/your-model-name.glb"`).

- When we want to send a dynamic prop value, a javascript expression or a number rather than a string, we will use the `:` `v-bind` shortcut like so:

```html
<ThreeDModel
  class="three-d-model"
  file-path="./models/your-model-name.glb"
  :use-editor="true"
/>
```

Here we're passing the prop `useEditor` using v-bind which means the value will be the `Boolean` value `true`.
Without the `:` the value would be a `String` value 'true'.

## <a id="customize-three-d-model-with-props"></a> Customize `ThreeDModel` with props

`ThreeDModel` takes three props:

- ### <a id="file-path"></a> `filePath (String)`
  We've already used the required prop `filePath` which is the path that points at your 3d-model to be loaded.
- ### <a id="custom-settings"></a> `customSettings (Object)`:
  An object that specifies settings to camera, lighting, orbit controls and rotation.
  The default values looks like this:

```js
{
//  Field of view, defines the extent of the scene that is seen on the display. Set in degrees, defaults to 50.
//  type: Number, min: 1, max: 180
   fov: 50,

 // Camera position, will be used if x, y and z is provided. Else it will be ignored and the camera position will be set automatically.
//  type: Number,  min: -50, max: 50
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
    // type: Number, min: 0, max: 100
     intensity: 0.5,
    // Recommended: Hex("FFFFFF") or Dec(16777215)
     color: "#FFFFFF",
   },

 // Illuminates the scene equally, without direction, set intensity and color to adjust the light
   ambientLight: {
    // type: Number, min: 0, max: 100
     intensity: 0.1,
    //Recommended: Hex("#FFFFFF") or Dec(16777215)
     color: "#FFFFFF",
   },

 // If set to true enables to interact with the model (zoom, grab, rotate), defaults to true
 // type: Boolean
 enableOrbitControls: true,

 // If set to true rotates the model, defaults to false
 // Type: Boolean
 autoRotate: false,

 // The rotation speed if autoRotate is set to true, defaults to 2
 // type: Number, min: 0.1, max: 100
 rotationSpeed: 2,

}
```

You can pass the `customSettings` prop to adjust all or some of the values like in this example:

:information_source: <b>Note that when passing values to the `cameraPosition` all of the properties `x`, `y` and `z` are required. If one or two of these values are left out, `ThreeDModel` will fall back to its default behaviour and set the camera position automatically</b>

```html
<ThreeDModel
  class="three-d-model"
  file-path="./models/your-model-name.glb"
  :use-editor="true"
  :custom-settings="{
    fov: 70,
    directionalLight: {
      intensity: 1
    },
    autoRotate: true
  }"
/>
```

Here we increase the `fov` value to 70, raises the intensity of the `directionalLight` to 1, and sets the `autoRotate` to true.

To make it easier to set the values of the `customSettings` prop, it's recommended to use the editor by setting prop `useEditor` to `true`.

:information_sourse: <b>Note that if the model you are using was created using the extension `KHR_materials_unlit`, no lights will be applicable, and thus no controls for `directionalLight` and `ambientLight` will show up in the editor. [read more about extensions here](#extensions) </b>

- ### <a id="use-editor"></a> `useEditor` (`Boolean`)
  When we set the value of prop `useEditor` to `true`, an editor will be created. This editor lets you play around and adjust the settings of the camera, the lighting, orbit controls and rotation.

If you want to use the current settings there are two options:

:information_source: <b>Note that the prop 'useEditor' will not be included when using `Copy as Template` or `Use Settings`</b>

- Click the `Copy as Template` button, which will copy a `ThreeDModel` template to the clipboard that you can paste into your project.
- Click the `Use Settings` button. This will `$emit` an event with the current settings wich makes it possible to listen to the event in your parent component like so:

Using `composition API (Vue 3)`:

```html
<script setup>
  ...
    function handleSettings(settings) {
      console.log('current settings: ', settings)
    }
  ...
</script>

<template>
  ...
  <ThreeDModel
    class="three-d-model"
    file-path="./models/your-model-name.glb"
    :use-editor="true"
    @use-settings="data => handleSettings(data)"
  />
  ...
</template>
```

Using `Options API (Vue 2)`:

```html
<template>
  ...
  <ThreeDModel
    class="three-d-model"
    file-path="./models/your-model-name.glb"
    :use-editor="true"
    @use-settings="data => handleSettings(data)"
  />
  ...
</template>

<script>
  export default {
    ...
      methods: {
        handleSettings(settings) {
          console.log('current settings: ', settings)
        }
      }
  ...
  };
</script>
```

The function `handleSettings` will be called everytime you click the `useSettings` button in the editor. If you want save the settings in a database or similar, just put your logic for this in the handleSettings function.

## <a id="control-three-d-model-with-css"></a> Control `ThreeDModel` with CSS

Here you can read about how to use CSS to control the 3d model

### <a id="set-width-and-height">Set width and height</a>

- In order to work correctly the `ThreeDmodel` component needs a width and height. If not, the width and height properties of the rendered canvas element that holds your model will be 0 and thus your model won't be visible. It's recommended to wrap the `ThreeDModel` in a div, and set the width and height of `ThreeDModel` relative to the wrapper div:

```html
<template>
  <div class="wrapper">
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />
  </div>
</template>

<!-- In this example we set the width and height to match the viewport. -->
<style>
  .wrapper {
    height: 100vh;
    width: 100vw;
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

We can use the CSS property `aspect-ratio` to define the ratio between width and height of the wrapper:

```html
<template>
  <div class="wrapper">
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />
  </div>
</template>
<!-- In this example we set the width of the wrapper to 80vw and the aspect-ratio to 4/3. -->
<style>
  .wrapper {
    width: 80vw;
    aspect-ratio: 4/3;
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

If we want we can use media querys to set the size of the wrapper:

```html
<template>
  <div class="wrapper">
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />
  </div>
</template>
<!-- In this example we use a media query breakpoint to change the width on larger devices -->
<style>
  .wrapper {
    width: 100vw;
    aspect-ratio: 4 / 3;
  }

  @media screen and (min-width: 992px) {
    .wrapper {
      width: 50vw;
    }
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

By default `ThreeDModel` will center the model and set the the camera position. [Here you can read about how to adjust the camera position and other settings](#customize-three-d-model-with-props).

### <a id="set-background"></a> Set background

To set the background color you simply do so by setting it either to the `ThreeDModel` itself or it's parent like so:

```html
<template>
  <div class="wrapper">
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />
  </div>
</template>
<style>
  .wrapper {
    background-color: #29bdc1;
    width: 80vw;
    aspect-ratio: 4/3;
  }

  .three-d-model {
    height: 100%;
    width: 100%;
  }
</style>
```

Or you can use a background image like in this example:

```html
<template>
  <div class="wrapper">
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />
  </div>
</template>

<style>
  .wrapper {
    width: 100vw;
    height: 100vh;
    background-image: url("https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .three-d-model {
    width: 100%;
    height: 100%;
  }
</style>
```

## <a id="extensions"></a> Extensions

When creating a gltf file there are a number of extensions one can use.
**_view-3d-model_** is using `three.js` to load and render 3d models, and thus supports the same extensions as the `GLTFLoader` in the `three.js` library.

While the most common extensions out there are supported, sometimes trying to load a file with a an unknown extensions can lead to problems.

One example of this worth mentioning is the deprecated extension `KHR_materials_pbrSpecularGlossiness)`.
Support for this extensions in `three.js` was dropped in november 2022, and while most gltfs already use the workflow `metal/rough` instead there still are some downloads using the extension. To solve this you'll need to convert the file to `metal/rough`. If your model is using this extension you will get a console message with a link to [this article where you can read about how to convert `spec/gloss` to `metal/rough`](https://www.donmccurdy.com/2022/11/28/converting-gltf-pbr-materials-from-specgloss-to-metalrough/).

Another common case which is not a problem but worth mentioning to avoid confusion, is when the gltf was created using the extension `KHR_materials_unlit`. When so, no lights will be applicable to the model and hence no controls for `ambientLight` or `directionalLight` will be created in the editor. [read more about the `KHR_materials_unlit extension` here](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_unlit/README.md).

### <a id="supported-extensions"></a> Supported extensions:

- KHR_draco_mesh_compression
- KHR_materials_clearcoat
- KHR_materials_ior
- KHR_materials_specular
- KHR_materials_transmission
- KHR_materials_iridescence
- KHR_materials_unlit
- KHR_materials_volume
- KHR_mesh_quantization
- KHR_lights_punctual1
- KHR_texture_basisu
- KHR_texture_transform
- EXT_texture_webp
- EXT_meshopt_compression
- EXT_mesh_gpu_instancing

#### Supported by an external user plugin:

- KHR_materials_variants2
- MSFT_texture_dds

[To read more about supported extensions in `three.js` `GLTFLoader`, click here](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

## <a id="trouble-shooting"></a> Troubleshooting

Common issues and solutions

### <a id="model-not-showing-up"></a> My 3d model doesn't show up

- Make sure your provided `filePath` is correct. If you're using `gltf` file format, your path shuld point at the gltf file. Also make sure that all the `gltf` resources such as textures etc is located in the same folder as the `gltf` file. If the file is not found you will get a message in the console.

- Make sure that the `ThreeDModel` has a width and height. Since the `ThreeDModel` adapts to the width and height given to it, it might not be visible if not having these values.
  [Read more about how to control `ThreeDModel` with CSS here](#control-threedmodel-with-css)

:information_source: <b>Note that if you're setting height and width using relative lenght `%`, the parent element must have a height and width</b>

### <a id="cant-set-lights"></a> I can't set the lights

- This probably means that the 3d model was created using the extension `KHR_materials_unlit`. This means no lights are applicable to the model and hence no controls are created for `ambientLight` or `directionalLight` in the editor. [Read more about extensions here](#extensions)

### <a id="not-looking-correct"></a> My model is not looking correct

- This could be due to the `gltf` was created using an unsupported extension. Check the console for messages. [Read more about extensions here](#extensions)

## <a id="create-vue-project"></a> Create a Vue.js Project

:information_source: <b>Since Vue 2 support will end on Dec 31 2023, this guide will show you how to create a Vue 3 project</b>

:information_source: <b>For detailed explanation on how things work, checkout [Vue.js official documentation](https://vuejs.org/guide/quick-start.html)</b>

### <a id="steps-to-create-vue"></a> Follow these steps to create a Vue.js application:

- Open up an empty project in your code editor.
- Make sure that you have `Node.js` version 16.0 or higher installed:
  - If you havent alreday, you can [download **_Node.js_** here](https://nodejs.org/en), choose the `LTS`(long-term-support) version.
  - You can check your `Node.js` version by typing the following in the command line:

```

node --version

```

- When you've made sure that your version is 16.0 or above, type the following in the command line:

```

npm init vue@latest

```

This command will install and execute `create-vue`, which is the official Vue project scaffolding tool.

You will be presented with prompts for several optional features. For now let's choose `No` on all options (you only need to fill in the `Project name`) and you should see something like this:

```

Project name: <your-project-name>
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.

```

- Once your project is created you run the following in the command line:

```

cd <your-project-name>

```

```

npm install

```

```

npm run dev

```

Now you should have your Vue project running on http://localhost:5173/.

If you want to change the port you can do so in the `package.json` file like so:

```json title="package.json"
{
  "name": "your-project-name",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite --port 3000", // Here you can change to your preferred port
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.0.0",
    "vite": "^4.1.4"
  }
}
```

Open the `App.vue` file inside the `src` folder it will look something like this:

```html title="App.vue"
<script setup>
  import HelloWorld from "./components/HelloWorld.vue";
  import TheWelcome from "./components/TheWelcome.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
  header {
    line-height: 1.5;
  }
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
    .logo {
      margin: 0 2rem 0 0;
    }
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
```

As you can see there are some autogenerated files in the components folder.

These files are imported in the `App.vue` and used to create a welcome page.

- Let's remove the files in the components folder.
- Clean up the `App.vue` file so that it looks like this:

```html title="App.vue"
<script setup></script>

<template> </template>

<style scoped></style>
```

In the `assets` folder there are two auto generated css files: `main.css` and `base.css`. These files are used to set a base styling to the application. You can remove or change the css in these files if you want to.

Now you can continue [here to get started with **_view-3d-model_**](#get-started) in your project.

## <a id="three-d-model"></a> ThreeDModel

### <a id="props"></a> Props

| Name           | Description                                                                      | Type      | Required | Default                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filePath       | Path to model                                                                    | `String`  | `true`   | -                                                                                                                                                                                                                                        |
| useEditor      | If set to true, an editor will be created to help adjust settings                | `Boolean` | `false`  | false                                                                                                                                                                                                                                    |
| customSettings | An object with settings to control camera, lighting, orbit controls and rotation | `Object`  | `false`  | {fov: 50, cameraPosition: {x: null,y: null,z: null}, exposure: 1, directionalLight: {intensity: 0.5, color: "#FFFFFF"}, ambientLight: {intensity: 0.1,color: "#FFFFFF"}, enableOrbitControls: true, autoRotate: false, rotationSpeed: 2} |

### <a id="events"></a> Events

| Event Name  | Description                                | Parameters                                          |
| ----------- | ------------------------------------------ | --------------------------------------------------- |
| useSettings | Fire when 'Use settings' button is clicked | The argument is an object with the current settings |

### <a id="methods"></a> Methods

| Method                  | Description                                                                                                      | Parameters                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------- |
| initialize              | Creating scene, camera and renderer                                                                              | -                          |
| setLights               | Adding lights to the scene Using values from props 'ambientLighting' and 'directionalLigthing'                   | -                          |
| animate                 | Adding animation loop                                                                                            | -                          |
| setEnvironment          | Adding an environment to the scene, to provide an even lighting to the scene                                     | -                          |
| createLoader            | Creating gltfLoader Creating dracoLoader which is used if gltf is compressed with draco                          | -                          |
| checkExtensions         | Setting isUnlit to true if method/usingUnllit returns true. Logs a warning if method/usingSpecGloss returns true | extensions, extensionsUsed |
| usingUnlit              | Returns true or false depending on if extension 'KHR_materials_unlit' is used.                                   | extensions, extensionsused |
| usingSpecGloss          | Returns true or false depending on if extension 'KHR_materials_pbrSpecularGlossiness' is used.                   | extensions, extensionsused |
| getCenterAndSize        | Creating a bounding box from model and returns the size and center                                               | -                          |
| centerModel             | Centering the loaded model                                                                                       | -                          |
| setCamera               | Setting the camera position                                                                                      | size, center               |
| setControls             | Adding orbit controls to be able to interact with the model, enabled if enableOrbitControls is set to true       | size                       |
| setRotation             | Adding rotation if autoRotate is set to true and rotation speed                                                  | -                          |
| updateCamera            | Updating camera projectionMatrix                                                                                 | -                          |
| render                  | Renders the scene and camera                                                                                     | -                          |
| updateCameraAndRenderer | Updating camera aspect ratio, projectionMatrix and renderers size                                                | -                          |
| onWindowResize          | Runs updateCameraAndRenderer on window resize window                                                             | -                          |
| getCurrentSettings      | Returns the current settings att any given moment. Will be used when emitting or copying settings from editor.   | -                          |
| handleUseSettings       | Emitting current settings                                                                                        | -                          |
| handleCopy              | Copies a ThreeDModel template with current settings to clipboard                                                 | -                          |
| triggerCopyMsg          | Setting 'showCopyMsg' to true for one second                                                                     | -                          |
| resetEditor             | Resets all values in Editor                                                                                      | -                          |
| createEditor            | Creating GUI to help adjusting the model                                                                         | -                          |

[npm]: https://img.shields.io/npm/v/view-3d-model
[npm-url]: https://www.npmjs.com/package/view-3d-model
[npm-downloads-per-week]: https://img.shields.io/npm/dw/view-3d-model
[npm-downloads-per-month]: https://img.shields.io/npm/dm/view-3d-model.svg
[npm-downloads-per-year]: https://img.shields.io/npm/dy/view-3d-model.svg
[npm-trends]: https://npmtrends.com/view-3d-model
