import { io } from "socket.io-client";


//this grabs the input from the user and logs it
const chatbox = document.getElementById("chatbox") as HTMLFormElement;


document.getElementById("submitButton")!.addEventListener("click", function(){

  console.log((document.getElementById("chatInput")! as HTMLInputElement).value);

})

const socket = io();


//step 1: grab the text input from the user
//(document.getElementById("chatInput")! as HTMLInputElement).value

//step 2: open/connect to the websocket
//step 3: throw the text input into the websocket

chatbox?.addEventListener("submit", function(e){
  e.preventDefault();

  socket.emit((document.getElementById("chatInput")! as HTMLInputElement).value);
  (document.getElementById("chatInput")! as HTMLInputElement).value = ' ';

})

//step 4: display the text

const chatMessage = document.createElement("p");
chatMessage.innerHTML = ("" + (document.getElementById("chatInput")! as HTMLInputElement))
chatbox.appendChild(chatMessage);
chatbox.scrollTo(0, 10);