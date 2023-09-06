"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomString(num) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < num) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
exports.default = randomString;
//# sourceMappingURL=randomString.js.map