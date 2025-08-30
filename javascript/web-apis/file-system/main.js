const openFileBtn = document.getElementById("openFileBtn");
const saveFileBtn = document.getElementById("saveFileBtn");
const fileNameSpan = document.getElementById("fileName");
const fileContentArea = document.getElementById("fileContent");
const fsSupportDiv = document.getElementById("fs-support");

let fileHandle = null;

// Check for File System Access API support
if (!window.showOpenFilePicker || !window.showSaveFilePicker) {
  fsSupportDiv.style.display = "block";
  openFileBtn.disabled = true;
  saveFileBtn.disabled = true;
} else {
  fsSupportDiv.style.display = "none";
}

openFileBtn.addEventListener("click", async () => {
  try {
    // Show file picker
    const [handle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".txt", ".md", ".js", ".json", ".csv"] },
        },
      ],
      excludeAcceptAllOption: false,
      multiple: false,
    });
    if (!handle) return;

    fileHandle = handle;
    const file = await handle.getFile();
    const contents = await file.text();
    fileContentArea.value = contents;
    fileNameSpan.textContent = file.name;
  } catch (err) {
    if (err.name !== "AbortError") {
      alert("Failed to open file: " + err.message);
    }
  }
});

saveFileBtn.addEventListener("click", async () => {
  try {
    let handle = fileHandle;
    if (!handle) {
      // If no file is open, prompt user to pick a file to save as
      handle = await window.showSaveFilePicker({
        suggestedName: "untitled.txt",
        types: [
          {
            description: "Text Files",
            accept: { "text/plain": [".txt", ".md", ".js", ".json", ".csv"] },
          },
        ],
      });
      fileHandle = handle;
      fileNameSpan.textContent = handle.name;
    }
    const writable = await handle.createWritable();
    await writable.write(fileContentArea.value);
    await writable.close();
    alert("File saved successfully!");
  } catch (err) {
    if (err.name !== "AbortError") {
      alert("Failed to save file: " + err.message);
    }
  }
});
