import express from "express";
const router = express.Router();

// handles global chat
router.post("/global", (request, response) => {
  console.log("enter /global chat*********");
  console.log(request.session.user);

  const { chatInput } = request.query;
  // @ts-expect-error TODO: figure out username type
  const { username } = request.session.user;
  console.log("Message to be sent back to the socket: ", chatInput, username);

  // emit the message that was sent to the room it came from
  request.app.get("io").to("global").emit("globalMessage", chatInput, username);
  response.status(200).send();
});

// handles specifc gameroom chat
// the room names will be like this -> room-${roomId}
// and the roomId will be set upon joining and leaving a room
// router.post("/:roomId", (request, response) => {
//   const { roomId } = request.params;
//   const { message } = request.body;

//   // @ts-expect-error TODO: Define the session type for the user object
//   const { email, gravatar } = request.session.user;

//   request.app.get("io").to(`game-${roomId}`).emit(`message:${roomId}`, {
//     message,
//     gravatar,
//     sender: email,
//     timestamp: new Date(),
//   });

//   response.status(200).send();
// });

export default router;
