// --- Speech Synthesis (Text to Speech) ---
const speakBtn = document.getElementById("speakBtn");
const stopSpeakBtn = document.getElementById("stopSpeakBtn");
const speakText = document.getElementById("speakText");
const voiceSelect = document.getElementById("voiceSelect");
const rateRange = document.getElementById("rateRange");
const rateValue = document.getElementById("rateValue");

let synth = window.speechSynthesis;
let voices = [];
let utterance = null;

function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})${
      voice.default ? " [default]" : ""
    }`;
    voiceSelect.appendChild(option);
  });
}

synth.onvoiceschanged = populateVoices;
populateVoices();

rateRange.addEventListener("input", () => {
  rateValue.textContent = rateRange.value;
});

speakBtn.addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel();
  }
  utterance = new SpeechSynthesisUtterance(speakText.value);
  const selectedVoice = voices[voiceSelect.value] || voices[0];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  utterance.rate = parseFloat(rateRange.value);
  synth.speak(utterance);
});

stopSpeakBtn.addEventListener("click", () => {
  synth.cancel();
});

// --- Speech Recognition (Speech to Text) ---
const startRecBtn = document.getElementById("startRecBtn");
const stopRecBtn = document.getElementById("stopRecBtn");
const recStatus = document.getElementById("recStatus");
const recResult = document.getElementById("recResult");

let recognition;
let recognizing = false;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    recognizing = true;
    recStatus.textContent = "Status: ouvindo...";
    startRecBtn.disabled = true;
    stopRecBtn.disabled = false;
  };

  recognition.onend = () => {
    // Only set recognizing to false and update UI if not manually stopped
    if (recognizing) {
      recognizing = false;
      recStatus.textContent = "Status: parado";
      startRecBtn.disabled = false;
      stopRecBtn.disabled = true;
    }
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    recResult.value = transcript;
  };

  recognition.onerror = (event) => {
    recStatus.textContent = `Erro: ${event.error}`;
    recognizing = false;
    startRecBtn.disabled = false;
    stopRecBtn.disabled = true;
  };

  startRecBtn.addEventListener("click", () => {
    // Prevent immediate stop by checking if already recognizing
    if (recognizing) return;
    recResult.value = "";
    recognizing = true;
    recognition.start();
  });

  stopRecBtn.addEventListener("click", () => {
    if (recognizing) {
      recognizing = false;
      recognition.stop();
    }
  });
} else {
  recStatus.textContent =
    "Reconhecimento de fala não suportado neste navegador.";
  startRecBtn.disabled = true;
  stopRecBtn.disabled = true;
}
