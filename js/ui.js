import { getStoredTheme, setStoredTheme } from "./storage.js";
import { times, getTimeForMode, getTimeKeyForMode } from "./utils.js";
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
export const durationTab = document.querySelectorAll(".duration-tabs .tab");

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

  getActiveTimerMode() {
    return (
      Array.from(timerTab).find((tab) => tab.classList.contains("active"))
        ?.dataset.mode ?? "pomodoro"
    );
  },

  setActiveSettingsMode(mode) {
    const activeSettingsTab = Array.from(durationTab).find(
      (tab) => tab.dataset.setting === mode,
    );

    if (!activeSettingsTab) {
      return null;
    }

    durationTab.forEach((tab) => {
      tab.classList.toggle("active", tab === activeSettingsTab);
    });

    return activeSettingsTab;
  },

  openSettingModal(e) {
    if (settingModalOverlay.classList.contains("hidden"))
      settingModalOverlay.classList.remove("hidden");

    const activeSettingsTab = UIChanges.setActiveSettingsMode(
      UIChanges.getActiveTimerMode(),
    );

    if (activeSettingsTab) {
      // emulate clickevent with the object as argument to reuse function
      UIChanges.setRangeSliderRangeAndValue({ target: activeSettingsTab });
    }
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

  setActiveTimerMode(mode) {
    const activeTab = Array.from(timerTab).find(
      (tab) => tab.dataset.mode === mode,
    );

    if (!activeTab) {
      return;
    }

    timerTab.forEach((tab) => {
      tab.classList.toggle("active", tab === activeTab);
    });

    setTimeInSec(getTimeForMode(mode));
    this.renderTime();
  },

  setActiveTab(e) {
    this.setActiveTimerMode(e.target.dataset.mode);
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
    toggleIcon.src = "icons/pause-logo.svg";
    timeControls.resetSecCounter();
  },

  toggleIcon() {
    if (toggleIcon.src.includes("pause-logo.svg")) {
      toggleIcon.src = "icons/resume-logo.svg";
      timeControls.pauseSecCounter();
    } else {
      toggleIcon.src = "icons/pause-logo.svg";
      timeControls.resumeSecCounter();
    }
  },

  setSettingsActiveTab(e) {
    const tab = e.target;
    durationTab.forEach((t) => {
      t.classList.toggle("active", t === tab);
    });
  },

  setRangeSliderRangeAndValue(e) {
    const mode = e.target.dataset.setting;
    if (mode === "pomodoro") {
      durationSlider.min = 5;
      durationSlider.max = 99;
    } else if (mode === "short-break") {
      durationSlider.min = 1;
      durationSlider.max = 30;
    } else if (mode === "long-break") {
      durationSlider.min = 1;
      durationSlider.max = 60;
    }

    durationSlider.value = getTimeForMode(mode) / 60;

    this.updateTimeFromSlider();
    this.updateSliderProgress();
  },

  useNewTime() {
    const newTimeInMin = parseFloat(durationSlider.value);

    const activeSettingsTimerTab = Array.from(durationTab).find((tab) =>
      tab.classList.contains("active"),
    )?.dataset.setting;

    if (!activeSettingsTimerTab) {
      return;
    }

    const newTimeInSec = timeControls.minToSec(newTimeInMin);

    const timesKey = getTimeKeyForMode(activeSettingsTimerTab);
    localStorage.setItem(timesKey, newTimeInSec);

    times[timesKey] = newTimeInSec;

    const activeTimerMode = this.getActiveTimerMode();

    if (activeTimerMode === activeSettingsTimerTab) {
      setTimeInSec(newTimeInSec);
      this.renderTime();
    }
  },
};
