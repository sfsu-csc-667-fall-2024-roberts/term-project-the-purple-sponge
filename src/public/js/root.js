window.onload = displayGames();

async function displayGames() {
  const display = document.getElementById("display-games"); // unordered list

  // checks if null or undefined
  if (display == undefined) {
    console.log("unable to get display games element!");
    return;
  }

  try {
    const response = await fetch("/games/getGames", { method: "GET" });
    if (!response.ok) {
      throw new Error(`Response ${response.status}`);
    }
    const json = await response.json();
    json.forEach((gameroom) => {
      const gameInfoRow = document.createElement("ul");
      gameInfoRow.classList.add("horizontal-list");

      console.log("gameInfoRow: ", gameroom);

      const room_name = document.createElement("li");
      const textNodeName = document.createTextNode(` ${gameroom.room_name}`);
      room_name.appendChild(textNodeName);

      const id = document.createElement("li");
      const textNodeId = document.createTextNode(`ID: ${gameroom.id}`);
      id.appendChild(textNodeId);

      const max_players = document.createElement("li");
      const textNodeMaxPlayers = document.createTextNode(
        `Max players:  ${gameroom.max_players}`
      );
      max_players.appendChild(textNodeMaxPlayers);

      const timer_speed = document.createElement("li");
      const textNodeTimerSpeed = document.createTextNode(
        `Timer speed: ${gameroom.timer_speed}`
      );
      timer_speed.appendChild(textNodeTimerSpeed);

      // build the final row in order
      gameInfoRow.appendChild(id);
      gameInfoRow.appendChild(room_name);
      gameInfoRow.appendChild(timer_speed);
      gameInfoRow.appendChild(max_players);

      const join_link = document.createElement("form");
      join_link.action = `http://localhost:3000/games/ingame/${gameroom.id}`;
      join_link.method = "get";
      join_link.style = "height:0;width:0";

      const join_button = document.createElement("button");
      join_button.innerHTML = "Join";
      join_button.style = "height:35.51";

      join_link.appendChild(join_button);
      gameInfoRow.appendChild(join_link);

      display.appendChild(gameInfoRow);
    });
  } catch (error) {
    console.error(error);
  }
}

document.getElementById;
