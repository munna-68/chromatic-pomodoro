export const DEFAULT_TIMES = Object.freeze({
  pomodoroTimeInSec: 1500,
  shortBreakTimeInSec: 300,
  longBreakTimeInSec: 900,
});

export const TIMER_STORAGE_KEYS = Object.freeze({
  pomodoro: "pomodoroTimeInSec",
  shortBreak: "shortBreakTimeInSec",
  longBreak: "longBreakTimeInSec",
});

function getStoredNumber(key, fallback) {
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    return fallback;
  }

  const parsedValue = Number(storedValue);

  return Number.isFinite(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
}

export function getStoredTheme() {
  return localStorage.getItem("theme") || "light";
}

export function setStoredTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function getStoredTimes() {
  return {
    pomodoroTimeInSec: getStoredNumber(
      TIMER_STORAGE_KEYS.pomodoro,
      DEFAULT_TIMES.pomodoroTimeInSec,
    ),
    shortBreakTimeInSec: getStoredNumber(
      TIMER_STORAGE_KEYS.shortBreak,
      DEFAULT_TIMES.shortBreakTimeInSec,
    ),
    longBreakTimeInSec: getStoredNumber(
      TIMER_STORAGE_KEYS.longBreak,
      DEFAULT_TIMES.longBreakTimeInSec,
    ),
  };
}

export function setStoredTime(key, value) {
  localStorage.setItem(key, String(value));
}

export function resetStoredTimes() {
  localStorage.removeItem(TIMER_STORAGE_KEYS.pomodoro);
  localStorage.removeItem(TIMER_STORAGE_KEYS.shortBreak);
  localStorage.removeItem(TIMER_STORAGE_KEYS.longBreak);
}
