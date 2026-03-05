const settingModalOverlay = document.getElementById("settings-modal");
const closeBtn = document.getElementById("close-btn");
const settingsBtn = document.getElementById("settings-btn");
const durationSlider = document.getElementById("duration-slider");
const durationValue = document.getElementById("duration-value");
const themeButtons = document.querySelectorAll(".theme-btn");
const saveBtn = document.querySelector(".save-btn");
const timerTab = document.querySelectorAll(".timer-tabs .tab");
const clock = document.getElementById("time");

let timeInSec;

const times = {
  pomodoroTimeInSec: 1500,
  shortBrakeTimeInSec: 300,
  longBrakeTimeInSec: 900,
};

function getTimeForMode(mode) {
  if (mode === "pomodoro") {
    return times.pomodoroTimeInSec;
  } else if (mode === "short-break") {
    return times.shortBrakeTimeInSec;
  } else if (mode === "long-break") {
    return times.longBrakeTimeInSec;
  }

  return times.pomodoroTimeInSec;
}

timeInSec = getTimeForMode("pomodoro");

let selectedTheme = localStorage.getItem("theme") || "light";

const ThemeManager = {
  selectTheme(theme) {
    selectedTheme = theme;
    UIChanges.setActiveThemeButton(theme);
  },

  saveTheme() {
    localStorage.setItem("theme", selectedTheme);
    UIChanges.applyTheme(selectedTheme);
    UIChanges.closeSettingsModal();
  },

  initTheme() {
    const saved = localStorage.getItem("theme") || "light";
    selectedTheme = saved;
    UIChanges.applyTheme(saved);
    UIChanges.setActiveThemeButton(saved);
  },
};

const UIChanges = {
  closeSettingsModal(e) {
    settingModalOverlay.classList.add("hidden");
  },
  openSettingModal(e) {
    if (settingModalOverlay.classList.contains("hidden"))
      settingModalOverlay.classList.remove("hidden");
  },

  updateTimeFromSlider() {
    const currentValue = durationSlider.value;
    durationValue.textContent = `${currentValue} min`;
  },

  updateSliderProgress() {
    const min = parseFloat(durationSlider.min) || 0;
    const max = parseFloat(durationSlider.max) || 100;
    const value = parseFloat(durationSlider.value);
    const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
    durationSlider.style.setProperty("--slider-progress", `${percent}%`);
  },

  applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  },

  setActiveThemeButton(theme) {
    themeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.theme === theme);
    });
  },

  setActiveTab(e) {
    const tab = e.target;
    timerTab.forEach((t) => {
      t.classList.toggle("active", t === tab);
    });
    const mode = tab.dataset.mode;
    timeInSec = getTimeForMode(mode);
  },

  renderTime() {
    clock.textContent = timeControls.secToMin(timeInSec);
  },
};

timerTab.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    UIChanges.setActiveTab(e);
    UIChanges.renderTime();
  });
});

const timeControls = {
  timerId: null,
  startSecCounter() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        timeInSec--;
        console.log(timeInSec);
        if (timeInSec === 1488) {
          this.stopSecCounter();
        }
      }, 1000);
    }
  },
  stopSecCounter() {
    clearInterval(this.timerId);
    this.timerId = null;
  },

  secToMin(sec) {
    let min = Math.floor(sec / 60);
    let second = sec % 60;
    return `${min}:${second.toString().padStart(2, "0")}`;
  },
};

timeControls.startSecCounter();

if (closeBtn) {
  closeBtn.addEventListener("click", UIChanges.closeSettingsModal);
}

if (settingsBtn) {
  settingsBtn.addEventListener("click", UIChanges.openSettingModal);
}

if (durationSlider) {
  durationSlider.addEventListener("input", UIChanges.updateSliderProgress);
  UIChanges.updateSliderProgress();
  durationSlider.addEventListener("input", UIChanges.updateTimeFromSlider);
  UIChanges.updateTimeFromSlider();
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    ThemeManager.selectTheme(btn.dataset.theme);
    UIChanges.applyTheme(btn.dataset.theme);
  });
});

if (saveBtn) {
  saveBtn.addEventListener("click", ThemeManager.saveTheme);
}

// Apply saved theme on page load
ThemeManager.initTheme();
