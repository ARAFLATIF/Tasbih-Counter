console.log("JavaScript loaded");

const zikrSelect = document.getElementById("zikrSelect");
const countDisplay = document.getElementById("count");
const totalDisplay = document.getElementById("totalCount");
const arabicDisplay = document.getElementById("zikrArabic");
const meaningDisplay = document.getElementById("zikrMeaning");

const zikrs = {
  SubhanAllah: {
    arabic: "سُبْحَانَ ٱللَّٰه",
    translit: "SubhanAllah",
    meaning: "Glory be to Allah"
  },
  Alhamdulillah: {
    arabic: "ٱلْـحَمْـدُ لِلّٰه",
    translit: "Alhamdulillah",
    meaning: "All praise is due to Allah"
  },
  AllahuAkbar: {
    arabic: "ٱللَّٰهُ أَكْبَر",
    translit: "Allahu Akbar",
    meaning: "Allah is the Greatest"
  },
  LaIlaha: {
    arabic: "لَا إِلٰهَ إِلَّا ٱللَّٰه",
    translit: "La ilaha illallah",
    meaning: "There is no god but Allah"
  },
  Astaghfirullah: {
    arabic: "أَسْتَغْفِرُ ٱللَّٰه",
    translit: "Astaghfirullah",
    meaning: "I seek forgiveness from Allah"
  },
  LaHawla: {
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    translit: "La hawla wa la quwwata illa billah",
    meaning: "No power or strength except with Allah"
  },
  Hasbunallah: {
    arabic: "حَسْبُنَا ٱللَّٰهُ وَنِعْمَ ٱلْوَكِيلُ",
    translit: "Hasbunallahu wa ni’mal wakeel",
    meaning: "Allah is sufficient for us and the best disposer of affairs"
  },
  Salawat: {
    arabic: "اللّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    translit: "Allahumma salli ‘ala Muhammad",
    meaning: "O Allah, send blessings upon Muhammad"
  }
};

let zikrCounts = JSON.parse(localStorage.getItem("zikrCounts")) || {};
let currentZikr = "SubhanAllah";

function updateDropdown() {
  for (const key in zikrs) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = `${zikrs[key].arabic} (${zikrs[key].translit})`;
    zikrSelect.appendChild(opt);
  }
}

function updateDisplay() {
  countDisplay.textContent = zikrCounts[currentZikr] || 0;
  arabicDisplay.textContent = zikrs[currentZikr].arabic;
  meaningDisplay.textContent = `${zikrs[currentZikr].translit} — ${zikrs[currentZikr].meaning}`;
  let total = Object.values(zikrCounts).reduce((sum, n) => sum + n, 0);
  totalDisplay.textContent = total;
}

function incrementCounter() {
  zikrCounts[currentZikr] = (zikrCounts[currentZikr] || 0) + 1;
  localStorage.setItem("zikrCounts", JSON.stringify(zikrCounts));
  updateDisplay();
}

function resetCounter() {
  if (confirm(`Reset count for ${zikrs[currentZikr].translit}?`)) {
    zikrCounts[currentZikr] = 0;
    localStorage.setItem("zikrCounts", JSON.stringify(zikrCounts));
    updateDisplay();
  }
}

function switchZikr(zikrName) {
  currentZikr = zikrName;
  updateDisplay();
}

function applyTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  applyTheme(current === "light" ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  updateDropdown();
  zikrSelect.value = currentZikr;
  updateDisplay();

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);

  const ayahs = [
    "Indeed, in the remembrance of Allah do hearts find rest. (Qur'an 13:28)",
    "So remember Me; I will remember you. (Qur'an 2:152)",
    "And the men and women who remember Allah often—Allah has prepared for them forgiveness and a great reward. (Qur'an 33:35)",
    "And your Lord says, 'Call upon Me; I will respond to you.' (Qur'an 40:60)"
  ];
  const dailyAyah = document.getElementById("dailyAyah");
  const ayahIndex = new Date().getDate() % ayahs.length;
  dailyAyah.textContent = ayahs[ayahIndex];
});


