var $7Db8t$react = require("react");
var $7Db8t$three = require("three");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}

$parcel$export(
  module.exports,
  "useResizeHelper",
  function () {
    return $52fb57f2dc126ad4$export$bd0a946f6f3d2bb1;
  },
  function (v) {
    return ($52fb57f2dc126ad4$export$bd0a946f6f3d2bb1 = v);
  },
);

const $b7719124d414b576$var$handleResize = (ref, options, camera) => {
  const _ref = ref;
  const _options = options;
  const _camera = camera;
  //calculate returned objected
  const _size = new (0, $7Db8t$three.Box3)().setFromObject(_ref.current);
  const _vFOV = (0, $7Db8t$three.MathUtils).degToRad(_camera.fov);
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
    aspect: _camera.aspect,
  };
  // end calculation
  const _aspect = _camera.aspect;
  if (_options) {
    let {
      breakpoints: breakpoints,
      positions: positions,
      rotations: rotations,
      scales: scales,
      fovs: fovs,
      camZs: camZs,
      useMin: useMin,
      setFunc: setFunc,
    } = _options;
    //basic validation
    if (!Array.isArray(breakpoints))
      throw new TypeError(
        "Options requires a breakpoints key referencing a breakpoint array. ",
        "ResizeHelper.js",
        11,
      );
    if (positions && !Array.isArray(positions))
      throw new TypeError(
        "Optional positions key must reference an array.",
        "ResizeHelper.js",
        18,
      );
    if (rotations && !Array.isArray(rotations))
      throw new TypeError(
        "Optional rotations key must reference an array.",
        "ResizeHelper.js",
        25,
      );
    if (scales && !Array.isArray(scales))
      throw new TypeError(
        "Optional scales key must reference an array.",
        "ResizeHelper.js",
        32,
      );
    if (fovs && !Array.isArray(fovs))
      throw new TypeError(
        "Optional fovs key must reference an array.",
        "ResizeHelper.js",
        39,
      );
    if (camZs && !Array.isArray(camZs))
      throw new TypeError(
        "Optional camZs key must reference an array.",
        "ResizeHelper.js",
        46,
      );
    // end validation
    /*insert current _aspect in the sorted breakpoint array and sort*/ breakpoints.push(
      _aspect,
    );
    breakpoints.sort();
    const index = breakpoints.indexOf(_aspect);
    /* find the array index for the changes to implement. Enforce correct breakpoints if aspect exactly matches a breakpoint */ let actionIndex =
      index;
    /*if usemin, if index is not last, check if entry is not equal to the next entry; if it is you have to use index + 1*/ if (
      useMin &&
      index != breakpoints.length - 1
    )
      actionIndex =
        breakpoints[index] === breakpoints[index + 1] ? index + 1 : index;
    /* apply the changes */ if (positions && positions[actionIndex]) {
      if (typeof positions[actionIndex] === "function") {
        const pos = positions[actionIndex](_returned, _options.functionScope);
        _ref.current.position.x = pos[0];
        _ref.current.position.y = pos[1];
        _ref.current.position.z = pos[2];
      } else {
        if (
          typeof positions[actionIndex][0] != "undefined" &&
          positions[actionIndex][0] != null
        )
          _ref.current.position.x = positions[actionIndex][0];
        if (
          typeof positions[actionIndex][1] != "undefined" &&
          positions[actionIndex][1] != null
        )
          _ref.current.position.y = positions[actionIndex][1];
        if (
          typeof positions[actionIndex][2] != "undefined" &&
          positions[actionIndex][2] != null
        )
          _ref.current.position.z = positions[actionIndex][2];
      }
    }
    if (rotations && rotations[actionIndex]) {
      if (typeof rotations[actionIndex] === "function") {
        const rot = rotations[actionIndex](_returned, _options.functionScope);
        _ref.current.rotation.x = rot[0];
        _ref.current.rotation.y = rot[1];
        _ref.current.rotation.z = rot[2];
      } else {
        if (
          typeof rotations[actionIndex][0] != "undefined" &&
          rotations[actionIndex][0] != null
        )
          _ref.current.rotation.x = rotations[actionIndex][0];
        if (
          typeof rotations[actionIndex][1] != "undefined" &&
          rotations[actionIndex][1] != null
        )
          _ref.current.rotation.y = rotations[actionIndex][1];
        if (
          typeof rotations[actionIndex][2] != "undefined" &&
          rotations[actionIndex][2] != null
        )
          _ref.current.rotation.z = rotations[actionIndex][2];
      }
    }
    if (scales && scales[actionIndex]) {
      if (typeof scales[actionIndex] === "function") {
        const sca = scales[actionIndex](_returned, _options.functionScope);
        _ref.current.scale.x = sca[0];
        _ref.current.scale.y = sca[1];
        _ref.current.scale.z = sca[2];
      } else {
        if (
          typeof scales[actionIndex][0] != "undefined" &&
          scales[actionIndex][0] != null
        )
          _ref.current.scale.x = scales[actionIndex][0];
        if (
          typeof scales[actionIndex][1] != "undefined" &&
          scales[actionIndex][1] != null
        )
          _ref.current.scale.y = scales[actionIndex][1];
        if (
          typeof scales[actionIndex][2] != "undefined" &&
          scales[actionIndex][2] != null
        )
          _ref.current.scale.z = scales[actionIndex][2];
      }
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
    if (setFunc && setFunc[actionIndex])
      setFunc[actionIndex](_returned, _options.functionScope);
  }
  return _returned;
};
const $b7719124d414b576$export$bd0a946f6f3d2bb1 = (ref, camera, options) => {
  let [dimensions, setDimensions] = (0, $7Db8t$react.useState)({
    objMin: null,
    objMax: null,
    visWidth: null,
    visHeight: null,
    aspect: null,
  });
  (0, $7Db8t$react.useEffect)(() => {
    setDimensions($b7719124d414b576$var$handleResize(ref, options, camera));
  }, [camera.aspect, ref, camera, options]);
  return dimensions;
};

var $52fb57f2dc126ad4$export$bd0a946f6f3d2bb1;
$52fb57f2dc126ad4$export$bd0a946f6f3d2bb1 =
  (0, $b7719124d414b576$export$bd0a946f6f3d2bb1);

//# sourceMappingURL=main.js.map
