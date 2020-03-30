import * as _fonts from './fonts';
import * as icons from './icons';

export const fonts = Object.keys(_fonts).map(o => ({ [o]: _fonts[o] }));
export const images = [
  ...Object.keys(icons).map(o => icons[o])
];
