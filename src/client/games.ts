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