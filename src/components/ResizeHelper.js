import { useEffect, useState } from "react";
import { Box3, MathUtils } from "three";

const handleResize = (ref, options, camera) => {
  const _ref = ref;
  const _options = options;
  const _camera = camera;
  //calculate returned objected
  const _size = new Box3().setFromObject(_ref.current);
  const _vFOV = MathUtils.degToRad(_camera.fov);
  const _height =
    2 *
    Math.tan(_vFOV / 2) *
    Math.abs(_ref.current.position.z - _camera.position.z); // visible height
  const _width = _height * _camera.aspect;
  const _returned = {
    objMin: _size.min,
    objMax: _size.max,
    visWidth: _width,
    visHeight: _height,
  };

  const { _aspect } = _camera;
  if (_options) {
    let { breakpoints, positions, rotations, scales, fovs, camZs, useMin } =
      _options;

    //basic validation
    if (!Array.isArray(breakpoints)) {
      throw new TypeError(
        "Options requires a breakpoints key referencing a breakpoint array. ",
        "ResizeHelper.js",
        11,
      );
    }
    if (positions && !Array.isArray(positions)) {
      throw new TypeError(
        "Optional positions key must reference an array.",
        "ResizeHelper.js",
        18,
      );
    }
    if (rotations && !Array.isArray(rotations)) {
      throw new TypeError(
        "Optional rotations key must reference an array.",
        "ResizeHelper.js",
        25,
      );
    }
    if (scales && !Array.isArray(scales)) {
      throw new TypeError(
        "Optional scales key must reference an array.",
        "ResizeHelper.js",
        32,
      );
    }
    if (fovs && !Array.isArray(fovs)) {
      throw new TypeError(
        "Optional fovs key must reference an array.",
        "ResizeHelper.js",
        39,
      );
    }
    if (camZs && !Array.isArray(camZs)) {
      throw new TypeError(
        "Optional camZs key must reference an array.",
        "ResizeHelper.js",
        46,
      );
    }
    /*insert current _aspect in the sorted breakpoint array*/
    breakpoints.push(_aspect);
    breakpoints.sort();
    const index = breakpoints.indexOf(_aspect);

    /* find the array index for the changes to implement */
    let actionIndex;
    //if usemin, if index is 0, _aspect is below lowest min breakpoint
    if (useMin && index > 0) {
      //apply changes at index - 1 breakpoint unless current _aspect is equal to next breakpoint, in which case we must apply changes at index.
      // e.g. [1, 2, _aspect = 2.5, 2.5, 3]
      actionIndex =
        breakpoints[index] === breakpoints[index + 1] ? index : index - 1;
      //if !usemin, if index is last, _aspect is above highest max breakpoint
    } else if (!useMin && index < breakpoints.length - 1) {
      //apply changes at index breakpoint (not index + 1 as we pushed an element to the original array) unless current _aspect is equal to previous breakpoint, in which case we must apply the changes at index - 1
      // e.g. [1, 2, 2.5, _aspect = 2.5, 3]
      // shouldn't happen to due Array.indexOf() implementation returning first matching index
      actionIndex =
        breakpoints[index] === breakpoints[index - 1] ? index - 1 : index;
    }

    /* apply the changes */

    if (positions && positions[actionIndex]) {
      positions[actionIndex][0] &&
        (_ref.current.position.x =
          typeof positions[actionIndex][0] === "function"
            ? positions[actionIndex][0](_returned, _options.functionScope)
            : positions[actionIndex][0]);
      positions[actionIndex][1] &&
        (_ref.current.position.y =
          typeof positions[actionIndex][1] === "function"
            ? positions[actionIndex][1](_returned, _options.functionScope)
            : positions[actionIndex][1]);
      positions[actionIndex][2] &&
        (_ref.current.position.z =
          typeof positions[actionIndex][2] === "function"
            ? positions[actionIndex][2](_returned, _options.functionScope)
            : positions[actionIndex][2]);
    }

    if (rotations && rotations[actionIndex]) {
      rotations[actionIndex][0] &&
        (_ref.current.position.x =
          typeof rotations[actionIndex][0] === "function"
            ? rotations[actionIndex][0](_returned, _options.functionScope)
            : rotations[actionIndex][0]);
      rotations[actionIndex][1] &&
        (_ref.current.position.y =
          typeof rotations[actionIndex][1] === "function"
            ? rotations[actionIndex][1](_returned, _options.functionScope)
            : rotations[actionIndex][1]);
      rotations[actionIndex][2] &&
        (_ref.current.position.z =
          typeof rotations[actionIndex][2] === "function"
            ? rotations[actionIndex][2](_returned, _options.functionScope)
            : rotations[actionIndex][2]);
    }

    if (scales && scales[actionIndex]) {
      scales[actionIndex][0] &&
        (_ref.current.scale.x =
          typeof scales[actionIndex][0] === "function"
            ? scales[actionIndex][0](_returned, _options.functionScope)
            : scales[actionIndex][0]);
      scales[actionIndex][1] &&
        (_ref.current.scale.y =
          typeof scales[actionIndex][1] === "function"
            ? scales[actionIndex][1](_returned, _options.functionScope)
            : scales[actionIndex][1]);
      scales[actionIndex][2] &&
        (_ref.current.scale.z =
          typeof scales[actionIndex][2] === "function"
            ? scales[actionIndex][2](_returned, _options.functionScope)
            : scales[actionIndex][2]);
    }
    if (fovs && fovs[actionIndex]) {
      _camera.fov =
        typeof fovs[actionIndex] === "function"
          ? fovs[actionIndex](_returned, _options.functionScope)
          : fovs[actionIndex];
      _camera.updateProjectionMatrix();
    }
    if (camZs && camZs[actionIndex]) {
      _camera.position.z =
        typeof camZs[actionIndex] === "function"
          ? camZs[actionIndex](_returned, _options.functionScope)
          : camZs[actionIndex];
      _camera.updateProjectionMatrix();
    }
  }
  return _returned;
};

export const useResizeHelper = (ref, camera, options) => {
  let [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    setDimensions(handleResize(ref, options, camera));
  }, [camera.aspect, ref, options, camera, ref.current]);

  return dimensions;
};
