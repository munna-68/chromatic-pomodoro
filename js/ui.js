import { getStoredTheme, setStoredTheme } from "./storage.js";
import { getTimeForMode } from "./utils.js";
import { getTimeInSec, setTimeInSec, timeControls } from "./timer.js";

export const settingModalOverlay = document.getElementById("settings-modal");
export const closeBtn = document.getElementById("close-btn");
export const settingsBtn = document.getElementById("settings-btn");
export const durationSlider = document.getElementById("duration-slider");
export const durationValue = document.getElementById("duration-value");
export const themeButtons = document.querySelectorAll(".theme-btn");
export const saveBtn = document.querySelector(".save-btn");
export const timerTab = document.querySelectorAll(".timer-tabs .tab");
export const clock = document.getElementById("time");
export const startBtn = document.getElementById("start-btn");
export const toggleIcon = document.getElementById("toggle-icon");
export const resetBtn = document.getElementById("reset-btn");
export const activeControls = document.querySelector(".active-controls");

let selectedTheme = getStoredTheme();

export const ThemeManager = {
  selectTheme(theme) {
    selectedTheme = theme;
    UIChanges.setActiveThemeButton(theme);
  },

  saveTheme() {
    setStoredTheme(selectedTheme);
    UIChanges.applyTheme(selectedTheme);
    UIChanges.closeSettingsModal();
  },

  initTheme() {
    const saved = getStoredTheme();
    selectedTheme = saved;
    UIChanges.applyTheme(saved);
    UIChanges.setActiveThemeButton(saved);
  },
};

export const UIChanges = {
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
    setTimeInSec(getTimeForMode(mode));
  },

  renderTime() {
    clock.textContent = timeControls.secToMin(getTimeInSec());
  },

  startBtnClickEvent() {
    startBtn.classList.add("hidden");
    activeControls.classList.remove("hidden");
    timeControls.startSecCounter();
  },

  resetBtnClickEvent() {
    startBtn.classList.remove("hidden");
    activeControls.classList.add("hidden");
  },

  toggleIcon() {
    if (toggleIcon.src.includes("pause-logo.svg")) {
      toggleIcon.src = "icons/resume-logo.svg";
    } else {
      toggleIcon.src = "icons/pause-logo.svg";
    }
  },
};
