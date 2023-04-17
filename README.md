# view-3d-model

**_view-3d-model_** is a `Vue.js` library that makes use of `three.js` and `gltfLoader` to allow users to display 3D models in their `Vue.js` applications.

This can be achieved by importing the `ThreeDModel` component from the library, which supports models in `gltf` format, as well as the binary version of `gltf`, which is `glb`.

:information_source: The `glb` version usually is about 30% smaller than the `gltf` version and thus recommended to use if possible.

## <a id="get-started"></a> Prerequisites

To use **_view-3d-model_** you will need a `Vue.js` project (or a `Nuxt` project), and a `gltf(glb)` file.

- If you are unfamiliar to the `Vue.js` javascript framework,
  [see this guide to create a Vue.js project](#create-vue-project)

- If you don't have a `gltf(glb)` file, there are plenty of free downloads on the web. For example you can visit [Sketchfab](https://sketchfab.com/features/free-3d-models), and download a 3d-model of your liking.
  Make sure that you choose the file format `gltf` or `glb` (`glb` formats is often to prefer because of its smaller size).

## Get Started

When you have a `glb` or `gltf` file, and a `Vue.js` project up and running, follow these steps to start using **_view-3d-model_**:

### Create a folder for your models

- First lets create a folder called `models` inside the `public` folder.

### Using `glb`

- If you have a model of the format `glb`, you can simply add the file to the `models` folder as it is.

  Your project's file structure should look like this:

```
your-project/
    node_modules
    public/
        models/
            name-of-your-model.glb
    src
    ...
    the rest of your files and folder

```

### Using `gltf`

- If you have a model of the format `gltf`, you'll notice that it consists of a number of different items. Usually there is a `texture folder`, a `scene.bin` file, a `license.txt` file and a `scene.gltf` file. Create a folder in your `models` folder with the name of your model, and add all the content of the `gltf` to this folder.

Your project should look like this:

```
your-project/
    node_modules
    public/
        models/
            name-of-your-model/
                textures
                license.txt
                scene.bin
                scene.gltf
    src
    ...
    the rest of your files and folder

```

### Install **_view-3d-model_**

- Install **_view-3d-model_** by typing the following in the command line:

```
npm install view-3d-model
```

### Import the `ThreeDModel` component

Follow these steps to import and use the `ThreeDModel` component in your project:

In `App.js`, or any other component:

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

<style>
  .three-d-model {
      height: 300px,
      width: 400px
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
    name: "App",
    components: {
      ThreeDModel,
    },
  };
</script>

<style>
  .three-d-model {
      height: 300px,
      width: 400px
  }
</style>
```

To make `ThreeDModel` available globally through out your project, you can add the following to your `main.js` file:

```js
import { createApp } from "vue";
import App from "./App.vue";
import ThreeDModel from "view-3d-model"; // Import ThreeDModel from view-3d-model

createApp(App)
  .component("ThreeDModel", ThreeDModel) // Register ThreeDModel as global component
  .mount("#app");
```

## <a id="create-vue-project"></a> Create a Vue.js Project

:information_source: Since Vue 2 support will end on Dec 31 2023, this guide will show you how to create a Vue 3 project.
:information_source: For detailed explanation on how things work, checkout [Vue.js official documentation](https://vuejs.org/guide/quick-start.html)

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

This command will install and execute `create-vue`, which is the official Vue project scaffolding tool. You will be presented with prompts for several optional features. For now let's chosose `No` on all options (you only need to fill in the `Project name`) and you should see something like this:

```
Project name: <your-project-name>
✔ Project name: … <your-project-name>
✔ Add TypeScript? … <div>No<div> / Yes
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

These files are imported in the `App.vue` used to create a welcome page.

- Let's remove the files in the components folder.
- Clean up the `App.vue` file so that it looks like this:

```html title="App.vue"
<script setup></script>

<template> </template>

<style scoped></style>
```

In the `assets` folder there are two auto generated css files: `main.css` and `base.css`. These files are used to set a base styling to the application. You can remove or change the css in these files if you want to.

Now you can continue [here to get started with **_view-3d-model_**](#get-started) in your project.
