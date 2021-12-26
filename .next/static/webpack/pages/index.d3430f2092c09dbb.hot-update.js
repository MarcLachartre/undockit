"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/javascript/components/overlay.js":
/*!**********************************************!*\
  !*** ./src/javascript/components/overlay.js ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Overlay; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _defineProperties(target, props) {\n    for(var i = 0; i < props.length; i++){\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n    }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    return Constructor;\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {\n        }));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar Overlay = /*#__PURE__*/ function(_Component) {\n    \"use strict\";\n    _inherits(Overlay, _Component);\n    var _super = _createSuper(Overlay);\n    function Overlay() {\n        _classCallCheck(this, Overlay);\n        return _super.apply(this, arguments);\n    }\n    _createClass(Overlay, [\n        {\n            key: \"removeMessageOnClick\",\n            value: function removeMessageOnClick() {\n                var _this = this;\n                var removeMessage = function() {\n                    var _this1 = _this;\n                    document.querySelector(\".message\").style.display = \"none\";\n                    setTimeout(function() {\n                        var content = \"All Systems - Online\";\n                        var animation = \"blink 1s steps(2, jump-none) 3 normal backwards\";\n                        var cursor = \"default\";\n                        _this1.displayMessage(content, animation, cursor);\n                    }, _this.props.displaySystemsOnlineTime);\n                    setTimeout(function() {\n                        document.querySelector(\".message\").style.display = \"none\";\n                    }, _this.props.displaySystemsOnlineTime + _this.props.systemsOnlineDuration);\n                    document.querySelector(\".message\").removeEventListener(\"click\", removeMessage);\n                    window.removeEventListener(\"keyup\", removeMessage);\n                };\n                document.querySelector(\".message\").addEventListener(\"click\", removeMessage);\n                window.addEventListener(\"keyup\", removeMessage);\n            }\n        },\n        {\n            key: \"displayMessage\",\n            value: function displayMessage(content, animation, cursor) {\n                var message = document.querySelector(\".message\");\n                message.innerHTML = content;\n                message.style.animation = animation;\n                message.style.cursor = cursor;\n                message.style.display = \"flex\";\n            }\n        },\n        {\n            key: \"componentDidMount\",\n            value: function componentDidMount() {\n                var _this = this;\n                setTimeout(function() {\n                    var content = \"Start Undock Procedure\";\n                    var animation = \"blink 1s steps(2, jump-none) infinite\";\n                    _this.displayMessage(content, animation);\n                    _this.removeMessageOnClick();\n                }, this.props.startTime);\n            }\n        },\n        {\n            key: \"render\",\n            value: function render() {\n                return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n                    className: \"overlay-container\",\n                    __source: {\n                        fileName: \"/Users/marclachartre/Code/MarcLachartre/mini apps/traveller/src/javascript/components/overlay.js\",\n                        lineNumber: 47,\n                        columnNumber: 10\n                    },\n                    __self: this,\n                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n                        className: \"message\",\n                        __source: {\n                            fileName: \"/Users/marclachartre/Code/MarcLachartre/mini apps/traveller/src/javascript/components/overlay.js\",\n                            lineNumber: 48,\n                            columnNumber: 13\n                        },\n                        __self: this\n                    })\n                }));\n            }\n        }\n    ]);\n    return Overlay;\n}((react__WEBPACK_IMPORTED_MODULE_1___default().Component));\n\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvamF2YXNjcmlwdC9jb21wb25lbnRzL292ZXJsYXkuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFSkMsT0FBTyxpQkFBYixRQUFROztjQUFGQSxPQUFPOzhCQUFQQSxPQUFPO2FBQVBBLE9BQU87OEJBQVBBLE9BQU87OztpQkFBUEEsT0FBTzs7WUFDeEJDLEdBQW9CLEVBQXBCQSxDQUFvQjttQkFBcEJBLFFBQVEsQ0FBUkEsb0JBQW9CLEdBQUcsQ0FBQzs7Z0JBQ3BCLEdBQUssQ0FBQ0MsYUFBYSxHQUFHLFFBQzlCLEdBRG9DLENBQUM7O29CQUV6QkMsUUFBUSxDQUFDQyxhQUFhLENBQUMsQ0FBVSxXQUFFQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxDQUFNO29CQUN6REMsVUFBVSxDQUFDLFFBQ3JCLEdBRHlCLENBQUM7d0JBQ1osR0FBSyxDQUFDQyxPQUFPLEdBQUcsQ0FBc0I7d0JBQ3RDLEdBQUssQ0FBQ0MsU0FBUyxHQUFHLENBQWlEO3dCQUNuRSxHQUFLLENBQUNDLE1BQU0sR0FBRyxDQUFTOytCQUVuQkMsY0FBYyxDQUFDSCxPQUFPLEVBQUVDLFNBQVMsRUFBRUMsTUFBTTtvQkFDbEQsQ0FBQyxRQUFPRSxLQUFLLENBQUNDLHdCQUF3QjtvQkFFdENOLFVBQVUsQ0FBQyxRQUN0QixHQUQyQixDQUFDO3dCQUNiSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxDQUFVLFdBQUVDLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLENBQU07b0JBQzdELENBQUMsUUFBUU0sS0FBSyxDQUFDQyx3QkFBd0IsU0FBUUQsS0FBSyxDQUFDRSxxQkFBcUI7b0JBRTFFWCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxDQUFVLFdBQUVXLG1CQUFtQixDQUFDLENBQU8sUUFBRWIsYUFBYTtvQkFDN0VjLE1BQU0sQ0FBQ0QsbUJBQW1CLENBQUMsQ0FBTyxRQUFFYixhQUFhO2dCQUNyRCxDQUFDO2dCQUVEQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxDQUFVLFdBQUVhLGdCQUFnQixDQUFDLENBQU8sUUFBRWYsYUFBYTtnQkFDMUVjLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUMsQ0FBTyxRQUFFZixhQUFhO1lBQ2xELENBQUM7OztZQUVEUyxHQUFjLEVBQWRBLENBQWM7bUJBQWRBLFFBQVEsQ0FBUkEsY0FBYyxDQUFDSCxPQUFPLEVBQUVDLFNBQVMsRUFBRUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hDLEdBQUssQ0FBQ1EsT0FBTyxHQUFHZixRQUFRLENBQUNDLGFBQWEsQ0FBQyxDQUFVO2dCQUNqRGMsT0FBTyxDQUFDQyxTQUFTLEdBQUdYLE9BQU87Z0JBQzNCVSxPQUFPLENBQUNiLEtBQUssQ0FBQ0ksU0FBUyxHQUFHQSxTQUFTO2dCQUNuQ1MsT0FBTyxDQUFDYixLQUFLLENBQUNLLE1BQU0sR0FBR0EsTUFBTTtnQkFDN0JRLE9BQU8sQ0FBQ2IsS0FBSyxDQUFDQyxPQUFPLEdBQUcsQ0FBTTtZQUNsQyxDQUFDOzs7WUFFRGMsR0FBaUIsRUFBakJBLENBQWlCO21CQUFqQkEsUUFBUSxDQUFSQSxpQkFBaUIsR0FBRyxDQUFDOztnQkFDakJiLFVBQVUsQ0FBQyxRQUNuQixHQUR5QixDQUFDO29CQUNkLEdBQUssQ0FBQ0MsT0FBTyxHQUFHLENBQXdCO29CQUN4QyxHQUFLLENBQUNDLFNBQVMsR0FBRyxDQUF1QzswQkFFcERFLGNBQWMsQ0FBQ0gsT0FBTyxFQUFFQyxTQUFTOzBCQUNqQ1Isb0JBQW9CO2dCQUM3QixDQUFDLEVBQUUsSUFBSSxDQUFDVyxLQUFLLENBQUNTLFNBQVM7WUFDM0IsQ0FBQzs7O1lBRURDLEdBQU0sRUFBTkEsQ0FBTTttQkFBTkEsUUFBUSxDQUFSQSxNQUFNLEdBQUcsQ0FBQztnQkFDWixNQUFNLHNFQUFFQyxDQUFHO29CQUFDQyxTQUFTLEVBQUUsQ0FBbUI7Ozs7Ozs7bUdBQy9CRCxDQUFHO3dCQUFDQyxTQUFTLEVBQUcsQ0FBUzs7Ozs7Ozs7O1lBSXJDLENBQUM7OztXQWpEbUJ4QixPQUFPO0VBQVNELHdEQUFlO0FBQXhCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9qYXZhc2NyaXB0L2NvbXBvbmVudHMvb3ZlcmxheS5qcz80ZjFlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE92ZXJsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbW92ZU1lc3NhZ2VPbkNsaWNrKCkge1xuICAgICAgICBjb25zdCByZW1vdmVNZXNzYWdlID0gKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2VcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBcIkFsbCBTeXN0ZW1zIC0gT25saW5lXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gXCJibGluayAxcyBzdGVwcygyLCBqdW1wLW5vbmUpIDMgbm9ybWFsIGJhY2t3YXJkc1wiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvciA9IFwiZGVmYXVsdFwiO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShjb250ZW50LCBhbmltYXRpb24sIGN1cnNvcik7XG4gICAgICAgICAgICB9LCB0aGlzLnByb3BzLmRpc3BsYXlTeXN0ZW1zT25saW5lVGltZSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH0sICh0aGlzLnByb3BzLmRpc3BsYXlTeXN0ZW1zT25saW5lVGltZSArIHRoaXMucHJvcHMuc3lzdGVtc09ubGluZUR1cmF0aW9uKSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZVwiKS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlTWVzc2FnZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHJlbW92ZU1lc3NhZ2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlTWVzc2FnZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgcmVtb3ZlTWVzc2FnZSk7XG4gICAgfVxuICAgIFxuICAgIGRpc3BsYXlNZXNzYWdlKGNvbnRlbnQsIGFuaW1hdGlvbiwgY3Vyc29yKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2VcIik7XG4gICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgbWVzc2FnZS5zdHlsZS5hbmltYXRpb24gPSBhbmltYXRpb247XG4gICAgICAgIG1lc3NhZ2Uuc3R5bGUuY3Vyc29yID0gY3Vyc29yO1xuICAgICAgICBtZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjsgXG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBcIlN0YXJ0IFVuZG9jayBQcm9jZWR1cmVcIjtcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IFwiYmxpbmsgMXMgc3RlcHMoMiwganVtcC1ub25lKSBpbmZpbml0ZVwiO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKGNvbnRlbnQsIGFuaW1hdGlvbik7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1lc3NhZ2VPbkNsaWNrKCk7XG4gICAgICAgIH0sIHRoaXMucHJvcHMuc3RhcnRUaW1lKVxuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPSBcIm92ZXJsYXktY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZSA9IFwibWVzc2FnZVwiPlxuXG4gICAgICAgICAgICA8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0fVxufSJdLCJuYW1lcyI6WyJSZWFjdCIsIk92ZXJsYXkiLCJyZW1vdmVNZXNzYWdlT25DbGljayIsInJlbW92ZU1lc3NhZ2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwiY29udGVudCIsImFuaW1hdGlvbiIsImN1cnNvciIsImRpc3BsYXlNZXNzYWdlIiwicHJvcHMiLCJkaXNwbGF5U3lzdGVtc09ubGluZVRpbWUiLCJzeXN0ZW1zT25saW5lRHVyYXRpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1lc3NhZ2UiLCJpbm5lckhUTUwiLCJjb21wb25lbnREaWRNb3VudCIsInN0YXJ0VGltZSIsInJlbmRlciIsImRpdiIsImNsYXNzTmFtZSIsIkNvbXBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/javascript/components/overlay.js\n");

/***/ })

});