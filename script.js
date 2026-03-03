const settingModalOverlay = document.getElementById("settings-modal");
const closeBtn = document.getElementById("close-btn");
const settingsBtn = document.getElementById("settings-btn");
const durationSlider = document.getElementById("duration-slider");
const durationValue = document.getElementById("duration-value");

let pomodoroTimeInSec = 1500;
let shortBrakeTimeInSec = 300;
let longBrakeTimeInSec = 900;

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
