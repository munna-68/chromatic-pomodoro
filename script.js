const settingModalOverlay = document.getElementById("settings-modal");
const closeBtn = document.getElementById("close-btn");
const settingsBtn = document.getElementById("settings-btn");

console.log("working");

const UIChanges = {
  closeSettingsModal(e) {
    settingModalOverlay.classList.add("hidden");
  },
  openSettingModal(e) {
    if (settingModalOverlay.classList.contains("hidden"))
      settingModalOverlay.classList.remove("hidden");
  },
};

if (closeBtn) {
  closeBtn.addEventListener("click", UIChanges.closeSettingsModal);
}

if (settingsBtn) {
  settingsBtn.addEventListener("click", UIChanges.openSettingModal);
}
