const locationBtn = document.getElementById("locationBtn");
const output = document.getElementById("output");

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    console.warn("Geolocation is not supported by your browser!");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      output.innerHTML = `
        Latidude: ${latitude.toFixed(5)}<br>
        Longitude: ${longitude.toFixed(5)} 
      `;
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location informartion is unavailable");
          break;
        case error.TIMEOUT:
          console.error("The request timed out.");
          break;
        default:
          console.error("An unknown error occurred!");
      }
    },
  );
});
