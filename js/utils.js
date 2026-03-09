export const times = {
  pomodoroTimeInSec: 1500,
  shortBrakeTimeInSec: 300,
  longBrakeTimeInSec: 900,
};

export function getTimeForMode(mode) {
  if (mode === "pomodoro") {
    return times.pomodoroTimeInSec;
  } else if (mode === "short-break") {
    return times.shortBrakeTimeInSec;
  } else if (mode === "long-break") {
    return times.longBrakeTimeInSec;
  }

  return times.pomodoroTimeInSec;
}
