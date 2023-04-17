# view-3d-model

**_view-3d-model_** is a `Vue.js` library that makes use of `three.js` and `gltfLoader` to allow users to display 3D models in their `Vue.js` applications. This can be achieved by importing the `ThreeDModel` component, which supports models in `gltf` format, as well as the binary version of `gltf`, which is `glb`.

## Prerequisites

To use **_view-3d-model_** you will need a `Vue.js` project, and a `gltf(glb)` file.

- If you are unfamiliar to the `Vue.js` javascript framework,
  [see this guide to create a Vue.js project](#create-vue-project)
- If you don't have a `gltf(glb)` file, there are plenty of free downloads on the web. For example you can visit [Sketchfab](https://sketchfab.com/features/free-3d-models), and download a 3d-model of your liking.
  Make sure that you choose the file format `gltf` or `glb`(`glb` formats is often to prefer because of its smaller size).

## Steps

### Create a folder for your models

- When you have a Vue project up and running, lets create a folder called `models` in the `public` folder.

### Using `glb`

- If you have a `glb` file you can simply add the file to the `models` folder as it is.

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

- If you have a model of the format `gltf` you'll notice that it consists of a number of different items. Usually there is a `texture folder`, a `scene.bin` file, a `license.txt` file and a `scene.gltf` file. Create a folder in your `models` folder with the name of your model, and add all the files in the `gltf` to this folder.

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

To make `ThreeDModel` available globally through out your project, you can add the following to your `main.js` file:

## <a id="create-vue-project"></a> Create a Vue.js Project

:information_source:

- Since Vue 2 support will end on Dec 31 2023, this guide will show you how to create a Vue 3 project.
- For detailed explanation on how things work, checkout [Vue.js official documentation](https://vuejs.org/guide/quick-start.html)

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
