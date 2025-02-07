"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(length) {
    let options = "aksdjfa98234hiasd8f234918234h11hkhasdfkha";
    let len = options.length;
    let ans = "";
    for (let i = 0; i < length; i++) {
        ans += options[Math.floor(Math.random() * len)]; // This will give random number between 0 to 20
    }
    return ans;
}
