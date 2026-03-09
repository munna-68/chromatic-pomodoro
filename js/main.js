import { getTimeForMode } from "./utils.js";
import { setTimeInSec } from "./timer.js";
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
  UIChanges,
} from "./ui.js";

setTimeInSec(getTimeForMode("pomodoro"));

timerTab.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    UIChanges.setActiveTab(e);
    UIChanges.renderTime();
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
  saveBtn.addEventListener("click", ThemeManager.saveTheme);
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
