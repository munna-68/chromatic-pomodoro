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
  shortBrakeCounter: 0,
  getNextMode(mode) {
    if (mode === "pomodoro") {
      if (this.shortBrakeCounter >= 2) {
        this.shortBrakeCounter = 0;
        return "long-break";
      }

      return "short-break";
    }

    if (mode === "short-break") {
      this.shortBrakeCounter += 1;
      return "pomodoro";
    }

    return "pomodoro";
  },

  startSecCounter() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        timeInSec--;
        UIChanges.renderTime();
        if (timeInSec === 0) {
          this.stopSecCounter();
          this.sound.play();
          const activeTab = Array.from(timerTab).find((tab) =>
            tab.classList.contains("active"),
          );
          const mode = activeTab?.dataset.mode ?? "pomodoro";
          const nextMode = this.getNextMode(mode);

          UIChanges.setActiveTimerMode(nextMode);
          UIChanges.resetBtnClickEvent();
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
