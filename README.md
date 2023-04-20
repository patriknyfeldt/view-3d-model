# view-3d-model

### The work with the documentation is in progress

**_view-3d-model_** is a `Vue.js` library that makes use of `three.js` and `gltfLoader` to allow users to display 3D models in their `Vue.js` applications.

This can be achieved by importing the `ThreeDModel` component from the library, which supports models in `gltf` format, as well as the binary version of `gltf`, which is `glb`.

:information_source: <b>The `glb` version usually is about 30% smaller than the `gltf` version and thus recommended to use if possible.</b>

<details>
<a id="get-started"></a>

<summary>  <b>Prerequisites</b> </summary>

## Prerequisites

To use **_view-3d-model_** you will need a `Vue.js` project (or a `Nuxt` project), and a `gltf(glb)` file.

- If you are unfamiliar to the `Vue.js` javascript framework,
  [see this guide to create a Vue.js project](#create-vue-project)

- If you don't have a `gltf(glb)` file, there are plenty of free downloads on the web. For example you can visit [Sketchfab](https://sketchfab.com/features/free-3d-models), and download a 3d-model of your liking.
Make sure that you choose the file format `gltf` or `glb` (`glb` formats is often to prefer because of its smaller size).
<!-- - If you don't have a `gltf(glb)` file, the fastest way to get you started is by downloading [this example glb by clicking here](https://github.com/patriknyfeldt/3d-models/raw/main/glb/nike.glb). -->

<!-- There are plenty of free downloads on the web. For example you can visit [Sketchfab](https://sketchfab.com/features/free-3d-models), and download a 3d-model of your liking.
Make sure that you choose the file format `gltf` or `glb` (`glb` formats is often to prefer because of its smaller size). -->
</details>
## Get Started

When you have a `glb` or `gltf` file, and a `Vue.js` project (or a `Nuxt` project), follow these steps to start using **_view-3d-model_**:

### Create a folder for your models

- First lets create a folder called `models` inside the `public` folder.

:information_source: <b>If you are using `Nuxt` use the `static` folder instead of `public`.</b>

### Using `glb`

- If you have a model of the format `glb`, you can simply add the file to the `models` folder as it is:

```
your-project/
...
    public/                              // Use static folder if using Nuxt
        models/
            name-of-your-model.glb
...
```

### Using `gltf`

- If you have a model of the format `gltf`, you'll notice that it consists of a number of different items. Usually there is a `texture folder` or a number of image files, a `bin` file, a `license.txt` file and a `gltf` file. Create a folder in your `models` folder with the name of your model, and add all the content of the `gltf` to this folder.

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

### Install **_view-3d-model_**

- Install **_view-3d-model_** by typing the following in the command line:

```
npm install view-3d-model
```

### Import and use the `ThreeDModel` component in Vue.js projects

**_[Click here to see how to import and use `ThreeDModel` in Nuxt project](#import-and-use-nuxt)_**

Follow these steps to import and use the `ThreeDModel` component in your `Vue.js` project:

In `App.vue`, or any other component where you want to use `ThreeDModel`:

Using `Composition API (Vue 3)`:

```html
<script setup>
  import ThreeDModel from "view-3d-model";
</script>

<template>
  <div>
    // If using glb format
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />

    // If using gltf format
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name/scene.gltf"
    />
  </div>
</template>
// In this example we set the width and height to match the viewport. // You can
change theese values as you like
<style>
  .three-d-model {
    height: 100vh;
    width: 100vw;
  }
</style>
```

Using `Options API (Vue 2)`:

```html
<template>
  <div>
    // If using glb format
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name.glb"
    />

    // If using gltf format
    <ThreeDModel
      class="three-d-model"
      file-path="./models/your-model-name/scene.gltf"
    />
  </div>
</template>

<script>
  import ThreeDModel from "view-3d-model";
  export default {
    name: "nameOfYourComponent",
    components: {
      ThreeDModel,
    },
  };
</script>
// In this example we set the width and height to match the viewport. // You can
change theese values as you like
<style>
  .three-d-model {
    height: 100vh;
    width: 100vw;
  }
</style>
```

To make `ThreeDModel` available globally throughout your `Vue.js` project add this to `main.js`:

```js title="src/main.js"
import { createApp } from "vue";
import App from "./App.vue";
import ThreeDModel from "view-3d-model"; // Import ThreeDModel from view-3d-model

createApp(App)
  .component("ThreeDModel", ThreeDModel) // Register ThreeDModel as global component
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

Now `ThreeDModel` is available globally throughout your `Nuxt` project without importing it in your components like so:

```html
<template>
  <div>
    // If using glb format
    <client-only>
      <ThreeDModel
        class="three-d-model"
        file-path="./models/your-model-name.glb"
      />
    </client-only>

    // If using gltf format
    <client-only>
      <ThreeDModel
        class="three-d-model"
        file-path="./models/your-model-name/scene.gltf"
      />
    </client-only>
  </div>
</template>
<script>
  export default {
    name: "nameOfYourComponent",
  };
</script>
// In this example we set the width and height to match the viewport. // You can
change theese values as you like
<style>
  .three-d-model {
    height: 100vh;
    width: 100vw;
  }
</style>
```

## <a id="using-three-d-model"></a> Using `ThreeDModel`

By now you should have a 3d model rendered to the screen. Now let's take a look at how you can adjust the settings of the model via props.

### Short on props in Vue.js

- `ThreeDModel` has one required prop: `filePath`. When we're passing props to a Vue component we typically do so in `kebab-case`, so in this guide we will be following that syntax.
  (As in the examples above when we passed the `filePath` prop, we do so like this: `file-path="./models/your-model-name.glb"`).

- When we want to send a dynamic prop value, a javascript expression or a number rather than a string, we will use the `:` `v-bind` shortcut like so:

```html
<ThreeDModel
  class="three-d-model"
  file-path="./models/your-model-name.glb"
  :use-editor="true"
/>
```

Here we pass the prop `useEditor` using v-bind which means the value will be the `Boolean` value `true`.
Without the `:` the value would be a `String` value 'true'.

## Customize the `ThreeDModel` with props

`ThreeDModel` takes three props:

- ### `filePath (String)`
  We've already used the required prop `filePath` which is the path that points at your 3d-model to be loaded.
- ### `customSettings (Object)`:
  An object that specifies settings to camera, lighting, orbit controls and rotation.
  The default value looks like this:

```js
{
 // Field of view, defines the extent of the scene that is seen on the display. Set in degrees, defaults to 50.
   fov: 50,
 // Camera position, will be used if x, y and z is provided. Else it will be ignored and default settings will be used.
   cameraPosition: {
     x: null,
     y: null,
     z: null,
   },
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

}
```

You can pass the `customSettings` prop to adjust one or more values like in this example:

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

- ### `useEditor` (`Boolean`)
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
<script>

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

## <a id="create-vue-project"></a> Create a Vue.js Project

:information_source: <b>Since Vue 2 support will end on Dec 31 2023, this guide will show you how to create a Vue 3 project<b>

:information_source: <b>For detailed explanation on how things work, checkout [Vue.js official documentation](https://vuejs.org/guide/quick-start.html)</b>

### To create a `Vue.js` application, follow these steps:

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
