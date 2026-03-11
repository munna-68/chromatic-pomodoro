import { getStoredTimes, TIMER_STORAGE_KEYS } from "./storage.js";

export const times = getStoredTimes();

const TIME_KEYS_BY_MODE = Object.freeze({
  pomodoro: TIMER_STORAGE_KEYS.pomodoro,
  "short-break": TIMER_STORAGE_KEYS.shortBreak,
  "long-break": TIMER_STORAGE_KEYS.longBreak,
});

export function getTimeKeyForMode(mode) {
  return TIME_KEYS_BY_MODE[mode] ?? TIME_KEYS_BY_MODE.pomodoro;
}

export function getTimeForMode(mode) {
  return times[getTimeKeyForMode(mode)];
}
