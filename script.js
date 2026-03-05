const settingModalOverlay = document.getElementById("settings-modal");
const closeBtn = document.getElementById("close-btn");
const settingsBtn = document.getElementById("settings-btn");
const durationSlider = document.getElementById("duration-slider");
const durationValue = document.getElementById("duration-value");
const themeButtons = document.querySelectorAll(".theme-btn");
const saveBtn = document.querySelector(".save-btn");

let pomodoroTimeInSec = 1500;
let shortBrakeTimeInSec = 300;
let longBrakeTimeInSec = 900;

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
};

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
