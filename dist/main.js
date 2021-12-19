var $7Db8t$swchelpers = require("@swc/helpers");
var $7Db8t$react = require("react");
var $7Db8t$three = require("three");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useResizeHelper", function () { return $52fb57f2dc126ad4$export$bd0a946f6f3d2bb1; }, function (v) { return $52fb57f2dc126ad4$export$bd0a946f6f3d2bb1 = v; });



var $b7719124d414b576$var$handleResize = function(ref, options, camera) {
    var _ref = ref;
    var _options = options;
    var _camera = camera;
    //calculate returned objected
    var _size = new $7Db8t$three.Box3().setFromObject(_ref.current);
    var _vFOV = $7Db8t$three.MathUtils.degToRad(_camera.fov);
    var _height = 2 * Math.tan(_vFOV / 2) * Math.abs(_ref.current.position.z - _camera.position.z); // visible height
    var _width = _height * _camera.aspect;
    var _returned = {
        objMin: _size.min,
        objMax: _size.max,
        visWidth: _width,
        visHeight: _height
    };
    var _aspect = _camera._aspect;
    if (_options) {
        var breakpoints = _options.breakpoints, positions = _options.positions, rotations = _options.rotations, scales = _options.scales, fovs = _options.fovs, camZs = _options.camZs, useMin = _options.useMin;
        //basic validation
        if (!Array.isArray(breakpoints)) throw new TypeError("Options requires a breakpoints key referencing a breakpoint array. ", "ResizeHelper.js", 11);
        if (positions && !Array.isArray(positions)) throw new TypeError("Optional positions key must reference an array.", "ResizeHelper.js", 18);
        if (rotations && !Array.isArray(rotations)) throw new TypeError("Optional rotations key must reference an array.", "ResizeHelper.js", 25);
        if (scales && !Array.isArray(scales)) throw new TypeError("Optional scales key must reference an array.", "ResizeHelper.js", 32);
        if (fovs && !Array.isArray(fovs)) throw new TypeError("Optional fovs key must reference an array.", "ResizeHelper.js", 39);
        if (camZs && !Array.isArray(camZs)) throw new TypeError("Optional camZs key must reference an array.", "ResizeHelper.js", 46);
        /*insert current _aspect in the sorted breakpoint array*/ breakpoints.push(_aspect);
        breakpoints.sort();
        var index = breakpoints.indexOf(_aspect);
        /* find the array index for the changes to implement */ var actionIndex;
        //if usemin, if index is 0, _aspect is below lowest min breakpoint
        if (useMin && index > 0) //apply changes at index - 1 breakpoint unless current _aspect is equal to next breakpoint, in which case we must apply changes at index.
        // e.g. [1, 2, _aspect = 2.5, 2.5, 3]
        actionIndex = breakpoints[index] === breakpoints[index + 1] ? index : index - 1;
        else if (!useMin && index < breakpoints.length - 1) //apply changes at index breakpoint (not index + 1 as we pushed an element to the original array) unless current _aspect is equal to previous breakpoint, in which case we must apply the changes at index - 1
        // e.g. [1, 2, 2.5, _aspect = 2.5, 3]
        // shouldn't happen to due Array.indexOf() implementation returning first matching index
        actionIndex = breakpoints[index] === breakpoints[index - 1] ? index - 1 : index;
        /* apply the changes */ if (positions && positions[actionIndex]) {
            positions[actionIndex][0] && (_ref.current.position.x = typeof positions[actionIndex][0] === "function" ? positions[actionIndex][0](_returned, _options.functionScope) : positions[actionIndex][0]);
            positions[actionIndex][1] && (_ref.current.position.y = typeof positions[actionIndex][1] === "function" ? positions[actionIndex][1](_returned, _options.functionScope) : positions[actionIndex][1]);
            positions[actionIndex][2] && (_ref.current.position.z = typeof positions[actionIndex][2] === "function" ? positions[actionIndex][2](_returned, _options.functionScope) : positions[actionIndex][2]);
        }
        if (rotations && rotations[actionIndex]) {
            rotations[actionIndex][0] && (_ref.current.position.x = typeof rotations[actionIndex][0] === "function" ? rotations[actionIndex][0](_returned, _options.functionScope) : rotations[actionIndex][0]);
            rotations[actionIndex][1] && (_ref.current.position.y = typeof rotations[actionIndex][1] === "function" ? rotations[actionIndex][1](_returned, _options.functionScope) : rotations[actionIndex][1]);
            rotations[actionIndex][2] && (_ref.current.position.z = typeof rotations[actionIndex][2] === "function" ? rotations[actionIndex][2](_returned, _options.functionScope) : rotations[actionIndex][2]);
        }
        if (scales && scales[actionIndex]) {
            scales[actionIndex][0] && (_ref.current.scale.x = typeof scales[actionIndex][0] === "function" ? scales[actionIndex][0](_returned, _options.functionScope) : scales[actionIndex][0]);
            scales[actionIndex][1] && (_ref.current.scale.y = typeof scales[actionIndex][1] === "function" ? scales[actionIndex][1](_returned, _options.functionScope) : scales[actionIndex][1]);
            scales[actionIndex][2] && (_ref.current.scale.z = typeof scales[actionIndex][2] === "function" ? scales[actionIndex][2](_returned, _options.functionScope) : scales[actionIndex][2]);
        }
        if (fovs && fovs[actionIndex]) {
            _camera.fov = typeof fovs[actionIndex] === "function" ? fovs[actionIndex](_returned, _options.functionScope) : fovs[actionIndex];
            _camera.updateProjectionMatrix();
        }
        if (camZs && camZs[actionIndex]) {
            _camera.position.z = typeof camZs[actionIndex] === "function" ? camZs[actionIndex](_returned, _options.functionScope) : camZs[actionIndex];
            _camera.updateProjectionMatrix();
        }
    }
    return _returned;
};
var $b7719124d414b576$export$bd0a946f6f3d2bb1 = function(ref, camera, options) {
    var ref1 = $7Db8t$swchelpers.slicedToArray($7Db8t$react.useState(null), 2), dimensions = ref1[0], setDimensions = ref1[1];
    $7Db8t$react.useEffect(function() {
        setDimensions($b7719124d414b576$var$handleResize(ref, options, camera));
    }, [
        camera.aspect,
        ref,
        options,
        camera,
        ref.current
    ]);
    return dimensions;
};


var $52fb57f2dc126ad4$export$bd0a946f6f3d2bb1;
$52fb57f2dc126ad4$export$bd0a946f6f3d2bb1 = $b7719124d414b576$export$bd0a946f6f3d2bb1;


//# sourceMappingURL=main.js.map
