export const randomInt = (min = 0, max = 1) =>
  Math.floor(Math.random() * Math.abs(max - min)) + min;

export const clamp = (num, min, max) =>
  num <= min ? min : num >= max ? max : num;
