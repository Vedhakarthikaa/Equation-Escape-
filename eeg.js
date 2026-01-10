/*********************************
 * EEG BRAIN STATE ANALYZER
 * PURE FRONTEND (NO PYTHON, NO FFT)
 *********************************/

let eegSignal = [];
let intervalId = null;
let modeInterval = null;

let mode = "alpha"; // delta | theta | alpha | beta
let currentState = "Relaxed";

const N = 256;     // rolling buffer size
const fs = 256;    // sampling rate

/* ===============================
   1. EEG BAND WAVES
================================ */
function generateBands(t) {
  return {
    delta: Math.sin(2 * Math.PI * 2 * t),   // 0.5–4 Hz
    theta: Math.sin(2 * Math.PI * 6 * t),   // 4–8 Hz
    alpha: Math.sin(2 * Math.PI * 10 * t),  // 8–13 Hz
    beta:  Math.sin(2 * Math.PI * 22 * t)   // 13–30 Hz
  };
}

/* ===============================
   2. EEG SAMPLE (MODE‑AWARE MIX)
================================ */
function generateEEGSample(t) {
  const b = generateBands(t);
  const noise = 0.15 * (Math.random() - 0.5);

  const weights = {
    delta: { delta: 1.3, theta: 0.2, alpha: 0.05, beta: 0.02 },
    theta: { delta: 0.3, theta: 1.2, alpha: 0.2, beta: 0.05 },
    alpha: { delta: 0.1, theta: 0.3, alpha: 1.3, beta: 0.1 },
    beta:  { delta: 0.05, theta: 0.2, alpha: 0.4, beta: 1.4 }
  };

  const w = weights[mode];

  return (
    b.delta * w.delta +
    b.theta * w.theta +
    b.alpha * w.alpha +
    b.beta  * w.beta +
    noise
  );
}

/* ===============================
   3. START / STOP EEG
================================ */
function startRealtimeEEG() {
  stopRealtimeEEG();

  eegSignal = [];
  let t = 0;

  mode = "alpha";

  // Change brain mode every 8s
  modeInterval = setInterval(() => {
    const modes = ["delta", "theta", "alpha", "beta"];
    mode = modes[Math.floor(Math.random() * modes.length)];
  }, 8000);

  intervalId = setInterval(() => {
    const sample = generateEEGSample(t);
    t += 1 / fs;

    eegSignal.push(sample);
    if (eegSignal.length > N) eegSignal.shift();

    drawSignal(eegSignal);
    analyzeEEG();
  }, 1000 / fs);
}

function stopRealtimeEEG() {
  clearInterval(intervalId);
  clearInterval(modeInterval);
  intervalId = null;
  modeInterval = null;
}

/* ===============================
   4. TIME‑DOMAIN EEG PLOT
================================ */
function drawSignal(signal) {
  const c = document.getElementById("signalCanvas");
  const ctx = c.getContext("2d");

  c.width = c.offsetWidth;
  c.height = 220;
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.beginPath();

  signal.forEach((v, i) => {
    const x = (i / signal.length) * c.width;
    const y = c.height / 2 - v * 40;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();
}

/* ===============================
   5. BAND ENERGY (NO FFT)
   Using slope + amplitude proxy
================================ */
function analyzeEEG() {
  let energy = { delta: 0, theta: 0, alpha: 0, beta: 0 };

  for (let i = 1; i < eegSignal.length; i++) {
    const diff = Math.abs(eegSignal[i] - eegSignal[i - 1]);

    if (diff < 0.02) energy.delta += diff;
    else if (diff < 0.05) energy.theta += diff;
    else if (diff < 0.09) energy.alpha += diff;
    else energy.beta += diff;
  }

  // Boost current mode slightly (realistic dominance)
  energy[mode] *= 1.6;

  const total =
    energy.delta + energy.theta +
    energy.alpha + energy.beta + 1e-6;

  const norm = {
    delta: energy.delta / total,
    theta: energy.theta / total,
    alpha: energy.alpha / total,
    beta:  energy.beta  / total
  };

  drawFrequency([
    norm.delta,
    norm.theta,
    norm.alpha,
    norm.beta
  ]);

  detectBrainState(norm);
}

/* ===============================
   6. FREQUENCY BARS
================================ */
function drawFrequency(bands) {
  const c = document.getElementById("freqCanvas");
  const ctx = c.getContext("2d");

  c.width = c.offsetWidth;
  c.height = 220;
  ctx.clearRect(0, 0, c.width, c.height);

  const labels = ["Delta", "Theta", "Alpha", "Beta"];
  const colors = ["#38bdf8", "#0ea5e9", "#22c55e", "#f97316"];
  const max = Math.max(...bands);

  bands.forEach((v, i) => {
    const w = c.width / 6;
    const x = (i * 1.5 + 1) * w;
    const h = (v / max) * (c.height - 40);

    ctx.fillStyle = colors[i];
    ctx.fillRect(x, c.height - h, w, h);

    ctx.fillStyle = "#fff";
    ctx.fillText(labels[i], x, c.height - h - 6);
  });
}

/* ===============================
   7. BRAIN STATE LOGIC
================================ */
function detectBrainState(n) {
  if (n.beta > 0.4) currentState = "Focused / Stressed";
  else if (n.alpha > 0.35) currentState = "Relaxed";
  else currentState = "Sleepy";

  const box = document.getElementById("state");
  const color =
    currentState.includes("Focused") ? "#f97316" :
    currentState === "Sleepy" ? "#38bdf8" : "#22c55e";

  box.innerText =
    `Brain State: ${currentState}
Mode: ${mode.toUpperCase()}
α ${(n.alpha * 100).toFixed(0)}%
β ${(n.beta * 100).toFixed(0)}%`;

  box.style.color = color;
  box.style.borderColor = color;
}
