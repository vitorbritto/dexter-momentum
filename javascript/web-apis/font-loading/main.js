const demoText = document.getElementById("demoText");
const fontSelect = document.getElementById("fontSelect");
const loadFontBtn = document.getElementById("loadFontBtn");
const fontStatus = document.getElementById("fontStatus");

const fontUrlMap = {
  Lobster:
    "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9zoKmMw.woff2",
  Oswald: "https://fonts.gstatic.com/s/oswald/v48/TK3iWkUHHAIjg752GT8G.woff2",
};

const fontFamilyMap = {
  Lobster: "'Lobster', cursive, sans-serif",
  Oswald: "'Oswald', Arial, sans-serif",
};

function setStatus(msg, isError = false) {
  fontStatus.textContent = msg;
  fontStatus.classList.toggle("error", isError);
}

loadFontBtn.addEventListener("click", async () => {
  const fontName = fontSelect.value;
  const fontUrl = fontUrlMap[fontName];

  if (!fontUrl) {
    setStatus("Unknown font selected.", true);
    return;
  }

  setStatus("Loading font...");

  try {
    const fontFace = new FontFace(fontName, `url(${fontUrl})`);
    await fontFace.load();
    document.fonts.add(fontFace);
    demoText.style.fontFamily = fontFamilyMap[fontName] || fontName;
    setStatus(`Font "${fontName}" loaded and applied!`);
  } catch (err) {
    setStatus(`Failed to load font: ${err.message}`, true);
  }
});
