"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILoginTest = exports.ILoginSettings = void 0;
exports.ILoginSettings = {
    username: { unique: true, require: true, min: 4, max: 14 },
    password: { unique: false, require: true, min: 6, max: 30 },
};
exports.ILoginTest = {
    username: { unique: true, require: true, min: exports.ILoginSettings.username.min, max: exports.ILoginSettings.username.max, value: "Testusername" },
    password: { unique: false, require: true, min: exports.ILoginSettings.password.min, max: exports.ILoginSettings.password.max, value: "Testpassword" },
};
//# sourceMappingURL=ILoginSettings.js.map