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

/***/ "./src/client/clientchat.ts":
/*!**********************************!*\
  !*** ./src/client/clientchat.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconsole.log(\"Webpack file 2\");\n//this grabs the input from the user and logs it\nconst chatBox = document.getElementById(\"chatBox\");\nconst input = document.getElementById(\"chatInput\");\nconst submit = document.getElementById(\"submitButton\");\nconst messageContainer = document.getElementById(\"messageContainer\"); // TODO: make a function that does this\nsubmit.addEventListener(\"click\", function () {\n    console.log(\"value of the message box: \", input.value);\n});\n// I think we have the socket stored in the window object already\n// const socket = io();\n//step 1: grab the text input from the user\n//(document.getElementById(\"chatInput\")! as HTMLInputElement).value\n//step 2: open/connect to the websocket\n//step 3: throw the text input into the websocket\n//step 4: display the text\n// add new behaviour to submit\nchatBox.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    // need to make chat route\n    // when user types it won't be printed instead it will wait for server to emit it back to us\n    // http fetch request to server with message contents (TODO: and maybe roomId)\n    // server will respond with an emit() back to client\n    // we will be listening for the event pertaining to \"message\"\n    // once we receive something from server we populate the chat with contents of any emits\n    // window.socket.emit(\"message\", (input.value = \" \"));\n});\n// create elements up on receiving message emits from server\n// window.socket.on()\n// const chatMessage = document.createElement(\"p\");\n// chatBox.appendChild(chatMessage);\n// chatBox.scrollTo(0, 10);\nfunction displayMessage(message) {\n    var _a;\n    const div = document.createElement(\"div\");\n    div.textContent = message;\n    (_a = document.getElementById(\"messageContainer\")) === null || _a === void 0 ? void 0 : _a.append(div);\n}\n\n\n//# sourceURL=webpack://term-project-bingo/./src/client/clientchat.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/clientchat.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;