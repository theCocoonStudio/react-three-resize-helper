[![npm](https://img.shields.io/npm/v/react-three-resize-helper.svg)](https://www.npmjs.com/package/react-three-resize-helper) ![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-three-resize-helper/peer/three)

# react-three-resize-helper

A React hook for responsive design with three.js and react-three-fiber

## Motivation

3D scenes and apps like games are often built for a set aspect ratio. When it comes to integrating 3D designs in regular websites, it becomes much more likely for the canvas to take different aspect ratios, e.g. if the canvas is fixed to the viepowrt dimensions.

In such cases, 3D elements in the scene could become cutoff, sized in an undesirable way, or be positioned poorly.

See [here](https://www.izzyerlich.com/blog/responsive-3d-design) for background information.

## Features

- makes it easy to set up a responsive three.js scene that makes your adjustments based on canvas aspect
- create canvas aspect breakpoints and add changes to your three.js scene that will automatically apply at those breakpoints
- make changes to any aspect of your object or three.js scene, including setting object positions, scales, and rotations, camera positions and fovs
- run custom callback setters with access to any data you pass the hook
- reactively get size information on the visible world at your object's position
- reactively get object position information in three.js world units that updates with canvas dimension changes (like THREE.Box3().setFromObject(yourObject))

## Getting Started

### Install:

`npm i react-three-resize-helper`

### Install the peer dependency, which you'll need ayway:

`npm i three`

### Import the hook:

```js
import { useResizeHelper } from "react-three-resize-helper";
```

### Other requirements:

Your scene must be already be responsive to canvas changes
