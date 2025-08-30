// Check for EyeDropper API support
const pickColorBtn = document.getElementById("pickColorBtn");
const colorPreview = document.getElementById("colorPreview");
const colorValue = document.getElementById("colorValue");
const supportMsg = document.getElementById("eyedropper-support");

if (!window.EyeDropper) {
  pickColorBtn.disabled = true;
  supportMsg.style.display = "block";
} else {
  supportMsg.style.display = "none";
  pickColorBtn.disabled = false;

  pickColorBtn.addEventListener("click", async () => {
    const eyeDropper = new EyeDropper();
    try {
      const result = await eyeDropper.open();
      colorPreview.style.background = result.sRGBHex;
      colorPreview.textContent = "";
      colorValue.textContent = result.sRGBHex;
    } catch (err) {
      // User cancelled or error occurred
      colorPreview.textContent = "No color";
      colorPreview.style.background = "#f3f4f6";
      colorValue.textContent = "None";
    }
  });
}
