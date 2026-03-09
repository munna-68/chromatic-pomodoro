import { UIChanges, timerTab } from "./ui.js";
import { getTimeForMode } from "./utils.js";
let timeInSec;

export function setTimeInSec(value) {
  timeInSec = value;
}

export function getTimeInSec() {
  return timeInSec;
}

export const timeControls = {
  sound: new Audio("sounds/alarm-sound.mp3"),
  timerId: null,
  startSecCounter() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        timeInSec--;
        UIChanges.renderTime();
        if (timeInSec === 0) {
          this.stopSecCounter();
          this.sound.play();
        }
      }, 1000);
    }
  },
  stopSecCounter() {
    clearInterval(this.timerId);
    this.timerId = null;
  },

  pauseSecCounter() {
    this.stopSecCounter();
  },

  resumeSecCounter() {
    this.startSecCounter();
  },

  resetSecCounter() {
    this.stopSecCounter();

    const activeTab = Array.from(timerTab).find((tab) =>
      tab.classList.contains("active"),
    );
    const mode = activeTab?.dataset.mode ?? "pomodoro";

    setTimeInSec(getTimeForMode(mode));
    UIChanges.renderTime();
  },

  secToMin(sec) {
    let min = Math.floor(sec / 60);
    let second = sec % 60;
    return `${min}:${second.toString().padStart(2, "0")}`;
  },
};
