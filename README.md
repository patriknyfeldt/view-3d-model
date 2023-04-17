# view-3d-model

**_view-3d-model_** is a `Vue.js` library that makes use of `three.js` and `gltfLoader` to allow users to display 3D models in their `Vue.js` applications. This can be achieved by importing the `ThreeDModel` component, which supports models in `gltf` format, as well as the binary version of `gltf`, which is `glb`.

## Prerequisites

To use **_view-3d-model_** you will need a `Vue.js` project, and a `gltf(glb)` file.

If you are unfamiliar to the `Vue.js` javascript framework,
[see this guide to create a Vue.js project](#create-vue-project)

## Steps

### Install **_view-3d-model_**

When you have Vue project up and running, you can add your gltf(glb) file to the public folder.

## <a id="create-vue-project"></a> Create a Vue.js Project

<div class="note">
:information_source: For detailed explanation on how things work, checkout [Vue.js official documentation](https://vuejs.org/guide/quick-start.html)
</div>

### To create a `Vue.js` application, follow these steps:

- Open up an empty project in your code editor.
- Make sure that you have `Node.js` version 16.0 or higher installed:
  - If you havent alreday, [you can download `Node.js` here](https://nodejs.org/en), choose the `LTS`(long-term-support) version.
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

Now you should have your Vue project running and can continue [here to install **_view-3d-model_**]() in your project.

<style>
.note {
  padding: 1em;
  margin: 1em 0;
  border-radius: 0.2em;
  background-color: #f0f8ff;
  color: #333;
  border: 1px solid #d0e3ff;
}
</style>
