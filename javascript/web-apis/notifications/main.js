const notifyBtn = document.getElementById("notifyBtn");
const output = document.getElementById("output");

notifyBtn.addEventListener("click", () => {
  if (!("Notification" in window)) {
    output.textContent = "This browser does not support notifications.";
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      output.textContent =
        "Permission granted! You can now receive notifications.";
    } else if (permission === "denied") {
      output.textContent = "Permission denied for notifications.";
    } else {
      output.textContent = "Permission for notification was not granted.";
    }
  });
});
