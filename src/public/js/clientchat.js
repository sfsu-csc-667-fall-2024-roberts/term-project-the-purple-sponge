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
/***/ (function() {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n// window.onload!(attachSocketListener());\nconsole.log(\"Webpack file 2\");\n//this grabs the input from the user and logs it\nconst chatBox = document.getElementById(\"chatBox\");\nconst input = document.getElementById(\"chatInput\");\nconst submit = document.getElementById(\"submitButton\");\nconst messageContainer = document.getElementById(\"messageContainer\");\n// submit!.addEventListener(\"click\", function () {\n//   console.log(\"value of the message box: \", input.value);\n// });\n// function that attaches a listening event to the socket after short time period\nwindow.addEventListener(\"load\", function () {\n    setTimeout(function () {\n        // Your function to execute after the timer\n        // only add the listener to the window socket object once upon loading\n        // wait for server emit and create necessary elements on the page\n        if (window.socket.listeners(\"globalMessage\").length < 1) {\n            window.socket.on(\"globalMessage\", (message, username) => {\n                displayMessage(`${username}: ${message}`);\n            });\n        }\n        console.log(\"Chat socket attached!\");\n    }, 200);\n});\n// I think we have the socket stored in the window object already\n// const socket = io();\nchatBox.addEventListener(\"submit\", (event) => __awaiter(void 0, void 0, void 0, function* () {\n    event.preventDefault();\n    // http fetch request to server with message contents (TODO: and maybe roomId)\n    // server will respond with an emit() back to client\n    // we will be listening for the event pertaining to \"message\"\n    // once we receive something from server we populate the chat with contents of any emits\n    try {\n        const response = yield fetch(`/chat/global?chatInput=${encodeURIComponent(input.value)}`, {\n            method: \"POST\",\n        });\n        if (response.status !== 200) {\n            console.error(`Error in clientchat: ${response.status}`);\n        }\n        // window.socket.removeListener(\"globalMessage\"); // remove the socket.on listener\n        // console.log(\n        //   \"Print eventlistner on socket: \",\n        //   window.socket.listeners(\"globalMessage\")\n        // );\n    }\n    catch (error) {\n        console.error(\"Error: \", error);\n    }\n}));\n// display message should be used only when receiving an emit from the server\nfunction displayMessage(message) {\n    if (messageContainer == undefined) {\n        console.error(\"Error: unable to find message container on page\");\n        return;\n    }\n    const div = document.createElement(\"div\");\n    div.textContent = message;\n    messageContainer.append(div);\n    input.value = \"\"; // reset the input upon submitting\n}\n\n\n//# sourceURL=webpack://term-project-bingo/./src/client/clientchat.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/clientchat.ts"]();
/******/ 	
/******/ })()
;