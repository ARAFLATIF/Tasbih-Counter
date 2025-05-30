const countDisplay = document.getElementById("count");
const zikrSelect = document.getElementById("zikrSelect");
const themeToggleBtn = document.getElementById("themeToggle");

let currentZikr = zikrSelect.value;
let zikrCounts = JSON.parse(localStorage.getItem("zikrCounts")) || {
  SubhanAllah: 0,
  Alhamdulillah: 0,
  AllahuAkbar: 0,
  LaIlaha: 0,
  Astaghfirullah: 0,
  LaHawla: 0
};

function updateDisplay() {
  countDisplay.textContent = zikrCounts[currentZikr];
}

function incrementCounter() {
  zikrCounts[currentZikr]++;
  updateDisplay();
  localStorage.setItem("zikrCounts", JSON.stringify(zikrCounts));
}

function resetCounter() {
  if (confirm(`Reset count for ${currentZikr}?`)) {
    zikrCounts[currentZikr] = 0;
    updateDisplay();
    localStorage.setItem("zikrCounts", JSON.stringify(zikrCounts));
  }
}

function switchZikr(zikrName) {
  currentZikr = zikrName;
  if (!(currentZikr in zikrCounts)) {
    zikrCounts[currentZikr] = 0;
  }
  updateDisplay();
  localStorage.setItem("zikrCounts", JSON.stringify(zikrCounts));
}

// Theme toggle
function applyTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
}

function toggleTheme() {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  updateDisplay();
});

themeToggleBtn.addEventListener("click", toggleTheme);


