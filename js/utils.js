export const times = {
  pomodoroTimeInSec: Number(localStorage.getItem("pomodoroTimeInSec")) || 1500,
  shortBreakTimeInSec:
    Number(localStorage.getItem("shortBreakTimeInSec")) || 300,
  longBreakTimeInSec: Number(localStorage.getItem("longBreakTimeInSec")) || 900,
};

export function getTimeKeyForMode(mode) {
  if (mode === "pomodoro") {
    return "pomodoroTimeInSec";
  }

  if (mode === "short-break") {
    return "shortBreakTimeInSec";
  }

  if (mode === "long-break") {
    return "longBreakTimeInSec";
  }

  return "pomodoroTimeInSec";
}

export function getTimeForMode(mode) {
  return times[getTimeKeyForMode(mode)];
}
