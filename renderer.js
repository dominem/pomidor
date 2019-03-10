// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const settings = require('./settings');
const elements = settings.elements;
const times = settings.times;

// Global timer - the return value of setInterval fn.
let timer = null;

function setTime(time) {
  let {minutes, seconds} = time;
  minutes = minutes.toString().padStart(settings.timeUnitWidth, settings.timeUnitFill);
  seconds = seconds.toString().padStart(settings.timeUnitWidth, settings.timeUnitFill);
  elements.time.innerHTML = `${minutes}:${seconds}`;
}

function isTimeZero(time) {
  return time.minutes === times.zero.minutes &&
    time.seconds === times.zero.seconds;
}

function decrementTime(time) {
  let {minutes, seconds} = time;
  if (isTimeZero(time)) {
    return time;
  } else if (seconds === settings.lowestSecond) {
    return {minutes: --minutes, seconds: settings.highestSecond};
  }
  return {minutes, seconds: --seconds};
}

function work(time) {
  if (isTimeZero(time)) {
    elements.alarm.load();
    elements.alarm.play();
    clearInterval(timer);
  } else {
    time = decrementTime(time);
    setTime(time);
  }
  return time;
}

function start(time) {
  clearInterval(timer);
  setTime(time);
  timer = setInterval(() => time = work(time), settings.second);
}

function stop() {
  clearInterval(timer);
  setTime(times.zero);
}

elements.pomidor.addEventListener('click', () => start(times.pomidor));
elements.longBreak.addEventListener('click', () => start(times.longBreak));
elements.shortBreak.addEventListener('click', () => start(times.shortBreak));
elements.reset.addEventListener('click', stop);