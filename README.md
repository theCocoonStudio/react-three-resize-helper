[![npm](https://img.shields.io/npm/v/react-three-resize-helper.svg)](https://www.npmjs.com/package/react-three-resize-helper) ![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-three-resize-helper/peer/three)

# react-three-resize-helper

A React hook for responsive design with three.js and react-three-fiber.

with `useResizeHelper`, you can easily use canvas aspect breakpoints and add changes to your three.js scene that will automatically apply at those breakpoints.

Make your scene adjustments based on position and size data provided by `useResizeHelper`.

## Motivation

3D scenes and apps like games are often built for a set aspect ratio. When it comes to integrating 3D designs in regular websites, it becomes much more likely for the canvas to take on different aspect ratios, e.g. if the canvas is fixed to the viepowrt dimensions.

If a scene is only designed for a single aspect ratio, 3D elements in the scene could be cut off, sized in an undesirable way, or be positioned poorly when the aspect changes.

Just like in regular responsive web design, the goal in responsive 3D design is to always position the objects in the scene correctly in the camera's view. In HTML and CSS, we use width and height breakpoints. In a 3D scene, aspect breakpoints are a better choice.

Because the three.js camera is defined with a vertical fov, the scene will always show the same thing in the vertical axis. This is different from traditional design with markdown and stylesheets that is based on vertical overflows and scroll.

For this reason, aspect breakpoints are better suited for these purpose.

See [here](https://www.izzyerlich.com/blog/responsive-3d-design) for background information.

## What is this hook?

This hook provides a way to easily make changes to your scene when the aspect ratio of the camera changes. It also returns some useful size and position data.

Changes to the canvas size will cause a re-render as the hook will run again and update your scene.

## Requirements

- Please ensure that your camera's world direction is (0, 0, 1), i.e., it should point toward the world's z-axis. If the camera and world have the same coordinate system, there is no need for projection calculations in the x and y direction. You can translate your camera along the z-axis with no issue, i.e. your camera's position (0, 0, z) can have any value for z.

- Your camera aspect must be already respond to canvas element size changes. `react-three-fiber` sets this up out of the box.

FIGURE

## Getting Started

### Install:

`npm i react-three-resize-helper`

### Install the peer dependency, which you'll need ayway:

`npm i three`

### Import the hook:

```js
import { useResizeHelper } from "react-three-resize-helper";
```

## Usage

### If you don't need to use aspecft breakpoints

You can declaratively set properties of your 3D objects, especially if you use a three.js React component framework like `react-three-fiber`.

```js
const threeComponent = () => {
  const ref = React.usRef();
  const data = useResizeHelper(ref, camera);
  return (
    <myThreeComponent
      ref={ref}
      position={[data.visWidth / 2, data.visHeight / 2, 10]}
    />
  );
};
```

The object above will always be placed at the center of the camera's visible space.

### Repsonsively changing the scene to different aspect ratios

You can use the hook to change objects of the scene at different aspect ratio breakpoints.

```js
const threeComponent = () => {
  const options = { breakpoints: [1.5] };
  const ref = React.usRef();
  const data = useResizeHelper(ref, camera, options);
  return (
    <myThreeComponent
      ref={ref}
      position={[data.visWidth / 2, data.visHeight / 2, 10]}
    />
  );
};
```

## API
