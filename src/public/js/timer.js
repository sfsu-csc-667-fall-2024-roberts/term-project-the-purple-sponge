const roomId = parseInt(window.location.pathname.substring(14));
console.log("something",roomId);

const timer = document.getElementById("timer");
timer.addEventListener("click", function() {
    fetch(`/games/ingame/${roomId}/start`, {
        method: "post",
        keepalive: true
    }).then((response) => {
        if (response.status !== 200) {
            console.error(response);
        }
    });
});

// let max = new Date;
// let clicks = 0;

// const timer = document.getElementById("timer");
// timer.onchange = function(){
//     clicks += 1;
// }

// timer.addEventListener("click", function(){
//     start();
// });

// function start() {
//     if (clicks == 0) {
//         clicks += 1;

//         max = new Date;
//         max.setHours(0);
//         max.setMinutes(0);
//         max.setSeconds(0);
//     }
    
    
//     loop();
// }

// function loop() {
//     setInterval(function() {
//         const reset = new Date;
//         if (max < reset) {
//             max.setDate(max.getDate() + 1);
//         }

//         const count = max - new Date;
//         const seconds = Math.floor(((count) % 10000) / 1000);
//         timer.innerHTML = `${seconds}`;
//     },1000);
// }