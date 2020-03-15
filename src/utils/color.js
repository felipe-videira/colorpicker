import { clamp, randomInt } from './math';

export const generateRGB = (min = 0, max = 255) => {
  min = clamp(min, 0, 255);
  max = clamp(max, 0, 255);
  return {
    r: randomInt(min, max),
    g: randomInt(min, max),
    b: randomInt(min, max),
  }
};

export const mutateRGB = ({ r, g, b }, min = 10, max = 20) => {
  return {
    r: r + randomInt(min, max),
    g: g + randomInt(min, max),
    b: b + randomInt(min, max),
  }
};
