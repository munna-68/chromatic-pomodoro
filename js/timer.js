let timeInSec;

export function setTimeInSec(value) {
  timeInSec = value;
}

export function getTimeInSec() {
  return timeInSec;
}

export const timeControls = {
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
