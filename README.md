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

You can use a hook for each object you need to change, enabling you to encapsulate the design into the component like you would with CSS-in-JS.

## Requirements

- Please ensure that your camera's world direction is (0, 0, 1), i.e., it should point toward the world's z-axis. If the camera and world have the same coordinate system, there is no need for projection calculations in the x and y direction. You can translate your camera along the z-axis with no issue, i.e. your camera's position (0, 0, z) can take any value for z.

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

### If you don't need to use aspect breakpoints

You can declaratively set properties of your 3D objects, especially if you use a three.js React component framework like `react-three-fiber`.

```js
const threeComponent = () => {
  const ref = React.usRef();
  const data = useResizeHelper(ref, camera);
  return (
    <myThreeComponent
      ref={ref}
      position={[data.visWidth * 0.25, -data.visHeight / 2, 10]}
    />
  );
};
```

The object above will always be placed three quarters to the left of the screen and aligned at the top of the canvas.

### Repsonsively changing the scene to different aspect ratios

You can use the hook to change objects of the scene at different aspect ratio breakpoints.

```js
const threeComponent = () => {
  const ref = React.usRef();
  const otherRef = React.useRef();

  const options = {
    breakpoints: [0.474, 0.778],
    positions: [
      [
        (info, scope) => [
          otherRef.position.x + 5,
          otherRef.position.y,
          otherRef.position.z,
        ],
      ],
      [
        (info, scope) => [
          otherRef.position.x + 3,
          otherRef.position.y,
          otherRef.position.z,
        ],
      ],
      [
        (info, scope) => [
          otherRef.position.x + 1,
          otherRef.position.y,
          otherRef.position.z,
        ],
      ],
    ],
    functionScope: { otherRef },
    useMin: true,
  };
  useResizeHelper(ref, camera, options);
  return (
    <>
      <react3FiberComponent ref={ref} />
      <react3FiberComponent ref={otherRef} />
    </>
  );
};
```

The snippet above positions one object in the scene relative to another objects; position. It uses `useResizeHelper` to declare two aspect breakpoints for some part of a scene. Using `useMin: true`, tells the hook these are minimum aspect breakpoints.

We always need one more change than the number of breakpoints. In this case, we need three: one for aspects below 0.474, aspects equal to or above 0.474, and aspects equal to or above 0.778. Whatever changes we put in the `positions` object will be applies at these three ranges.

If we were to use maximum aspect breakpoints in snippet case above, we'd need a change for aspects equal to 0.474 or lower, aspects above 0.474 but lower than 0.778, and for aspects above 0.778.

**Note: unlike with CSS, there is no cascading of styles. You should explicitly set your changes for each range depending on your breakpoints and whether `useMin` is `true` or `false`.**

In the snippet above, the callback calculates the required position and returns a point in the form of an array containing the x, y, and z values, respectively. It uses a reference to another object because it is calculating position for one object based on another object's position.

Instead of a callback, we could have entered an array with some value or expression for each of the axes:

```js
positions: [
    [0, 0, 5],
    [0, 0, 3],
    [0, 0, 1],
  ],
```

## API

`useResizeHelper(ref, camera, options)`

### Return value

A regular object with the following properties:

- **aspect**: Number

The aspect ratio of the provided three.js camera. The hook updates when the aspect changes, e.g. when the canvas size changes.

- **objMin**: THREE.Vector3, **objMax**: THREE.Vector3

The minimum and maximum positional values of the bounding box of the object at `ref.current` in all three dimensions.

No different than:

```js
new THREE.Box3().setFromObject(ref.current).min;
```

- **visWidth**: Number, **visHeight**: Number

The width and height, in three.js world units, of the visible plane at the object's position relative to the camera.

FIGURE

The center will always be at point `(0, 0)` provided that the camera is positioned as required above. `(-visWidth / 2, visHeight)`, for example, is at the bottom left corner of the canavas.

### Parameters

1. **ref** | React Ref | Required

A ref to an `Object3D` or other three.js 3D component. `useResizeHelper` uses this object's z-coordinate to calculate the visible width and height at the object's position. These numbers are returned by the hook.

2. **camera** | THREE.PerspectiveCamera | Required

A reference to the three.js perspective camera that your scene uses.

3. **options** | Object | Optional

An object containing the following properties:

---

**breakpoints** | Array | Required

An array of Numbers specifying the breakpoints at which changes should apply. For example, `[0.5, 1]` specifies three distinct aspect ratio ranges, depending on the value of `useMin`.

If `useMin` is `true`, you should specify changes for the following aspect ranges:

- `[0, 0.5)`
- `[0.5, 1)`
- `[1, Infinity)`

If `useMin` is `false`, you should specify changes for the following aspect ranges:

- `[0, 0.5]`
- `(0.5, 1]`
- `(1, Infinity)`

---

**positions** | Array | Optional

A convenience property. An array containing the positional changes to be made to the object at `ref.current` at the specified breakpoints. The length of this array should be greater than the `breakpoints` array by a value of one, since `n` breakpoints specify `n + 1` aspect ranges.

The members of this array can be one of the following:

- An array of x-, y-, and z-coordinate positional values to be applied to the object at `ref.current`.

For example, `[0.5, 2, 1]` would change the position of the object to `(0.5, 2, 1)` at the aspect range it is specified for. You can use `null` in any of the coordinates if you don't wish to make any changes to it at that breakpoint.

- A function `(info, scope) => [x, y, z]` returning an array like the one described above. The function takes two parameters: `info`, an object with the same properties as those returned by `useResizeHelper`, and `scope`, the object optionally defined in `setFunc` (see below for more info).

- `null`, if no positional changes should be made at this breakpoint.

Example usage:

```js
const options = {
  breakpoints: [0.5, 1],
  positions: [[0, 0, 0], [0, 0, 0], (info) => [info.visWidth * 0.25, 0, 0]],
  useMin: true,
};
```

Since `useMin` is `true`, the above snippet will place the object at the point `(0, 0, 0)` at the aspect range [0, 1) and at the point `(info.visWidth * 0.25, 0, 0)` at the aspect range `[1, Infinity).`

---
