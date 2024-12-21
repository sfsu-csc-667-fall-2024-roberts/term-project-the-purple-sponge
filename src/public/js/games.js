/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/games.ts":
/*!*****************************!*\
  !*** ./src/client/games.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.update = void 0;\nwindow.addEventListener(\"beforeunload\", function (e) {\n    fetch(`/games/leave`, {\n        method: \"post\",\n        keepalive: true\n    }).then((response) => {\n        if (response.status !== 200) {\n            console.error(response);\n        }\n    });\n});\nconst roomId = parseInt(window.location.pathname.substring(14));\nwindow.socket.on(`game-${roomId}-update`, (socket) => {\n    (0, exports.update)(socket);\n});\nconst update = (socket) => {\n    //\n};\nexports.update = update;\n\n\n//# sourceURL=webpack://term-project-bingo/./src/client/games.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/games.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;