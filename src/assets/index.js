import * as fonts from './fonts';
import * as icons from './icons';

export default {
    fonts: Object.keys(fonts).map(o => ({ [o]: fonts[o] })),
    images: [ 
        ...Object.keys(icons).map(o => icons[o]) 
    ] 
}