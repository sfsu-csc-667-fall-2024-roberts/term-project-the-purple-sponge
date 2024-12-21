window.addEventListener("beforeunload", function(e) {
    fetch(`/games/leave`, {
        method: "post",
        keepalive: true
    }).then((response) => {
        if (response.status !== 200) {
            console.error(response);
        }
    });
});

const roomId = parseInt(window.location.pathname.substring(14));
window.socket.on(`game-${roomId}-update`, (socket) => {
    update(socket);
});

export const update = (socket: any) => {
    //
};