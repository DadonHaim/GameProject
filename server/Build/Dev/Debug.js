"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Debug(string) {
    if (process.env.HAIM.trim() === 'build') {
        var file = __filename.split('\\');
        var index = file.length - 1;
        console.log("Debug:\t ".concat(file[index - 2], "\\").concat(file[index - 1], "\\").concat(file[index], ":\t ").concat(string));
    }
}
exports.default = Debug;
//# sourceMappingURL=debug.js.map