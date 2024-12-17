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
    // console.log("json: ", json);
    json.forEach((gameroom) => {
      // console.log("printing each room", gameroom);
      display.innerText += JSON.stringify(gameroom);
    });
  } catch (error) {
    console.error(error);
  }
}
