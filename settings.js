// How many milliseconds takes one second?
// While testing, it may be helpful to give it a small value (e.g. 10).
const second = 1000;

const lowestMinute = 0;
const lowestSecond = 0;
const highestSecond = 59;

const times = {
  zero: {minutes: lowestMinute, seconds: lowestSecond},
  pomidor: {minutes: 25, seconds: lowestSecond},
  longBreak: {minutes: 10, seconds: lowestSecond},
  shortBreak: {minutes: 5, seconds: lowestSecond},
};

const timeUnitWidth = 2;
const timeUnitFill = '0';

const elementIds = {
  time: 'time',
  alarm: 'alarm',
  pomidor: 'pomidor',
  longBreak: 'longBreak',
  shortBreak: 'shortBreak',
  reset: 'reset'
};

const elements = Object.keys(elementIds).reduce((result, key) => (
  {...result, [key]: document.getElementById(elementIds[key])}
), {});

module.exports = {
  second,
  lowestSecond,
  lowestMinute,
  highestSecond,
  times,
  timeUnitWidth,
  timeUnitFill,
  elementIds,
  elements
};