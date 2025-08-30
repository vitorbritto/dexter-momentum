const copyBtn = document.getElementById("copyBtn");
const textToCopy = document.getElementById("textToCopy");
const statusMsg = document.getElementById("statusMessage");

document.addEventListener("click", async () => {
  try {
    if (!navigator.clipboard) {
      console.warn("Clipboard API not supported on this browser!");
      return;
    }

    const text = textToCopy.value;

    await navigator.clipboard.writeText(text);

    statusMsg.textContent = "Text copied to clipboard!";
    statusMsg.style.color = "green";
  } catch (err) {
    statusMsg.textContent = "Failed to copy!";
    statusMsg.style.color = "red";

    console.error("Copy failed", err);
  }
});
