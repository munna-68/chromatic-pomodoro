import { getTimeForMode } from "./utils.js";
import { setTimeInSec, timeControls } from "./timer.js";
import {
  closeBtn,
  durationSlider,
  saveBtn,
  settingsBtn,
  ThemeManager,
  themeButtons,
  timerTab,
  startBtn,
  toggleIcon,
  resetBtn,
  durationTab,
  UIChanges,
  settingResetBtn,
} from "./ui.js";

const preloader = document.getElementById("preloader");
const preloaderBar = document.getElementById("preloader-progress-bar");
const preloaderText = document.getElementById("preloader-progress-text");

function updatePreloader(percent) {
  if (!preloaderBar || !preloaderText) {
    return;
  }

  const safePercent = Math.max(0, Math.min(100, percent));
  const rounded = Math.floor(safePercent);
  preloaderBar.style.width = `${safePercent}%`;
  preloaderText.textContent = `${rounded} %`;
}

function completePreloader() {
  if (!preloader) {
    document.body.classList.remove("loading");
    return;
  }

  updatePreloader(100);

  setTimeout(() => {
    preloader.classList.add("exit");
    document.body.classList.remove("loading");

    preloader.addEventListener(
      "transitionend",
      () => {
        preloader.classList.add("hidden");
      },
      { once: true },
    );
  }, 260);
}

function startPreloader() {
  if (!preloader || preloader.classList.contains("hidden")) {
    document.body.classList.remove("loading");
    return;
  }

  let currentProgress = 0;
  const durationMs = 2100;
  const tickMs = 95;
  const startTime = performance.now();

  updatePreloader(currentProgress);

  const loadInterval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const linearTarget = Math.min((elapsed / durationMs) * 100, 100);
    const jitter = Math.random() * 5.5;

    currentProgress = Math.max(currentProgress + jitter, linearTarget);
    currentProgress = Math.min(currentProgress, 99.4);

    if (elapsed >= durationMs) {
      clearInterval(loadInterval);
      completePreloader();
      return;
    }

    updatePreloader(currentProgress);
  }, tickMs);
}

if (document.readyState === "complete") {
  startPreloader();
} else {
  window.addEventListener("load", startPreloader, { once: true });
}

setTimeInSec(getTimeForMode("pomodoro"));

timerTab.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    UIChanges.setActiveTab(e);
    timeControls.stopSecCounter();
    UIChanges.resetBtnClickEvent();
    UIChanges.renderTime();
  });
});

durationTab.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    UIChanges.setSettingsActiveTab(e);
    UIChanges.setRangeSliderRangeAndValue(e);
  });
});

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
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    UIChanges.useNewTime();
    ThemeManager.saveTheme();
  });
}

ThemeManager.initTheme();

if (startBtn) {
  startBtn.addEventListener("click", UIChanges.startBtnClickEvent);
}

if (resetBtn) {
  resetBtn.addEventListener("click", UIChanges.resetBtnClickEvent);
}

if (toggleIcon) {
  toggleIcon.addEventListener("click", UIChanges.toggleIcon);
}

if (settingResetBtn) {
  settingResetBtn.addEventListener("click", UIChanges.resetSettingsValue);
}

document.addEventListener("DOMContentLoaded", () => {
  UIChanges.renderTime();
});
