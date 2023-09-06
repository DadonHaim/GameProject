"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRegisterTest = exports.IRegisterSettings = void 0;
var randomString_1 = __importDefault(require("@Functions/randomString"));
exports.IRegisterSettings = {
    username: { unique: true, require: true, min: 4, max: 14 },
    email: { unique: true, require: true, min: 6, max: 50 },
    password: { unique: false, require: true, min: 6, max: 30 },
    firstName: { unique: false, require: false, min: 2, max: 12 },
    lastName: { unique: false, require: false, min: 2, max: 12 }
};
exports.IRegisterTest = {
    username: { unique: true, require: true, min: exports.IRegisterSettings.username.min, max: exports.IRegisterSettings.username.max, value: "Test" + (0, randomString_1.default)(6) },
    password: { unique: false, require: true, min: exports.IRegisterSettings.email.min, max: exports.IRegisterSettings.email.max, value: "Test" + (0, randomString_1.default)(6) },
    email: { unique: true, require: true, min: exports.IRegisterSettings.password.min, max: exports.IRegisterSettings.password.max, value: "Test" + (0, randomString_1.default)(6) },
    firstName: { unique: false, require: true, min: exports.IRegisterSettings.firstName.min, max: exports.IRegisterSettings.firstName.max, value: "Test" + (0, randomString_1.default)(6) },
    lastName: { unique: false, require: true, min: exports.IRegisterSettings.lastName.min, max: exports.IRegisterSettings.lastName.max, value: "Test" + (0, randomString_1.default)(6) }
};
//# sourceMappingURL=IRegisterSettings.js.map