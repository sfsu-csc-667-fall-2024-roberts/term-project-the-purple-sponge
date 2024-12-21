// window.onload!(attachSocketListener());
console.log("Webpack file 2");

//this grabs the input from the user and logs it
const chatBox = document.getElementById("chatBox") as HTMLFormElement;
const input = document.getElementById("chatInput") as HTMLInputElement;
const submit = document.getElementById("submitButton");
const messageContainer = document.getElementById("messageContainer");

// submit!.addEventListener("click", function () {
//   console.log("value of the message box: ", input.value);
// });

// function that attaches a listening event to the socket after short time period
window.addEventListener("load", function () {
  setTimeout(function () {
    // Your function to execute after the timer
    // only add the listener to the window socket object once upon loading
    // wait for server emit and create necessary elements on the page
    if (window.socket.listeners("globalMessage").length < 1) {
      window.socket.on("globalMessage", (message: string, username: string) => {
        displayMessage(`${username}: ${message}`);
      });
    }
    console.log("Chat socket attached!");
  }, 200);
});

// I think we have the socket stored in the window object already
// const socket = io();
chatBox.addEventListener("submit", async (event) => {
  event.preventDefault();

  // http fetch request to server with message contents (TODO: and maybe roomId)
  // server will respond with an emit() back to client
  // we will be listening for the event pertaining to "message"
  // once we receive something from server we populate the chat with contents of any emits
  try {
    const response = await fetch(
      `/chat/global?chatInput=${encodeURIComponent(input.value)}`,
      {
        method: "POST",
      }
    );

    if (response.status !== 200) {
      console.error(`Error in clientchat: ${response.status}`);
    }

    // window.socket.removeListener("globalMessage"); // remove the socket.on listener
    // console.log(
    //   "Print eventlistner on socket: ",
    //   window.socket.listeners("globalMessage")
    // );
  } catch (error) {
    console.error("Error: ", error);
  }
});

// display message should be used only when receiving an emit from the server
function displayMessage(message: string) {
  if (messageContainer == undefined) {
    console.error("Error: unable to find message container on page");
    return;
  }

  const div = document.createElement("div");
  div.textContent = message;
  messageContainer.append(div);
  input.value = ""; // reset the input upon submitting
}
