window.onload = displayGames();

async function displayGames() {
  const display = document.getElementById("display-games"); // unordered list

  // checks if null or undefined
  if (display == undefined) {
    console.log("unable to get display games element!");
    return;
  }

  if (display.innerHTML.trim() !== "") {
    display.innerHTML = "";
  } else {
    display.innerHTML = "Please log in to see ongoing games :)";
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

      let id;
      let room_name;
      let max_players;
      let timer_speed;
      console.log("gameInfoRow: ", gameroom);
      for (const key in gameroom) {
        // console.log(key, ": ", gameroom[key]);

        switch (key) {
          case "id": {
            id = document.createElement("li");
            const textNode = document.createTextNode(`ID: ${gameroom[key]}`);
            id.appendChild(textNode);
            break;
          }
          case "room_name": {
            room_name = document.createElement("li");
            const textNode = document.createTextNode(
              `Room name: ${gameroom[key]}`
            );
            room_name.appendChild(textNode);
            break;
          }
          case "max_players": {
            max_players = document.createElement("li");
            const textNode = document.createTextNode(
              `Max Players: ${gameroom[key]}`
            );
            max_players.appendChild(textNode);
            break;
          }
          case "timer_speed": {
            timer_speed = document.createElement("li");
            const textNode = document.createTextNode(
              `Timer Speed: ${gameroom[key]}`
            );
            timer_speed.appendChild(textNode);
            break;
          }
        } // end switch
      }
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

document.getElementById