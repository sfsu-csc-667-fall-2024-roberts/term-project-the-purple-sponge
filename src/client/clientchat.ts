import { io } from "socket.io-client";
console.log("Webpack file 2");
//this grabs the input from the user and logs it
const chatBox = document.getElementById("chatBox") as HTMLFormElement;
const input = document.getElementById("chatInput") as HTMLInputElement;
const submit = document.getElementById("submitButton");
const messageContainer = document.getElementById("messageContainer"); // TODO: make a function that does this

submit!.addEventListener("click", function () {
  console.log("value of the message box: ", input.value);
});

// I think we have the socket stored in the window object already
// const socket = io();

//step 1: grab the text input from the user
//(document.getElementById("chatInput")! as HTMLInputElement).value

//step 2: open/connect to the websocket
//step 3: throw the text input into the websocket
//step 4: display the text
// add new behaviour to submit

chatBox.addEventListener("submit", (e) => {
  e.preventDefault();

  // need to make chat route
  // when user types it won't be printed instead it will wait for server to emit it back to us

  // http fetch request to server with message contents (TODO: and maybe roomId)
  // server will respond with an emit() back to client
  // we will be listening for the event pertaining to "message"
  // once we receive something from server we populate the chat with contents of any emits
  // window.socket.emit("message", (input.value = " "));
});

// create elements up on receiving message emits from server
// window.socket.on()

// const chatMessage = document.createElement("p");
// chatBox.appendChild(chatMessage);
// chatBox.scrollTo(0, 10);

function displayMessage(message: string) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("messageContainer")?.append(div);
}
