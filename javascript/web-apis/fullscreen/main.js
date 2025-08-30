const box = document.getElementById("fullscreenBox");
const enterBtn = document.getElementById("enterBtn");
const exitBtn = document.getElementById("exitBtn");
const status = document.getElementById("status");

function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function updateStatus() {
  if (isFullscreen()) {
    status.textContent = "Status: In fullscreen";
    box.classList.add("fullscreen");
    enterBtn.disabled = true;
    exitBtn.disabled = false;
  } else {
    status.textContent = "Status: Not in fullscreen";
    box.classList.remove("fullscreen");
    enterBtn.disabled = false;
    exitBtn.disabled = true;
  }
}

function requestFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

enterBtn.addEventListener("click", () => {
  requestFullscreen(box);
});

exitBtn.addEventListener("click", () => {
  exitFullscreen();
});

document.addEventListener("fullscreenchange", updateStatus);
document.addEventListener("webkitfullscreenchange", updateStatus);
document.addEventListener("mozfullscreenchange", updateStatus);
document.addEventListener("MSFullscreenChange", updateStatus);

// Initial status
updateStatus();
