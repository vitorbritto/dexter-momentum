function delayedMessage(message, delay, callback) {
    setTimeout(() => {
        callback(message);
    }, delay);
}

delayedMessage("Task complete!", 2000, () => console.log("Fired!"));
