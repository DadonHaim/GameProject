"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = __importDefault(require("@Database/Connection"));
var ResultValid_1 = __importDefault(require("./ResultValid"));
var IRegisterSettings_1 = require("@Root/Settings/IRegisterSettings");
function RegisterValidation(obj) {
    var message = [];
    if (!obj.username)
        message.push("שם משתמש חסר");
    if (!obj.password)
        message.push("סיסמה חסרה");
    if (!obj.email)
        message.push("אימיל חסר");
    if (message.length == 0) {
        if (obj.username.length > IRegisterSettings_1.IRegisterSettings.username.max)
            message.push("שם המשתמש ארוך מדי");
        if (obj.username.length < IRegisterSettings_1.IRegisterSettings.username.min)
            message.push("שם המשתמש קצר מדי");
        if (obj.password.length < IRegisterSettings_1.IRegisterSettings.password.min)
            message.push("הסיסמה קצרה מדי");
        if (obj.password.length > IRegisterSettings_1.IRegisterSettings.password.max)
            message.push("הסיסמה ארוכה מדי");
        if (obj.firstName.length > 1 && obj.firstName.length < IRegisterSettings_1.IRegisterSettings.firstName.min)
            message.push("שם פרטי קצר  מדי");
        if (obj.firstName.length > IRegisterSettings_1.IRegisterSettings.firstName.max)
            message.push("שם פרטי ארוך  מדי");
        if (obj.lastName.length > 1 && obj.lastName.length < IRegisterSettings_1.IRegisterSettings.lastName.min)
            message.push("שם משפחה קצר  מדי");
        if (obj.lastName.length > IRegisterSettings_1.IRegisterSettings.lastName.max)
            message.push("שם משפחה ארוך  מדי");
    }
    Connection_1.default.QuerySync("Select username,email from users where username = '".concat(obj.username, "'or email='").concat(obj.email, "'"))
        .ValidDB(function (data) {
        if (data[0].username == obj.username)
            message.push("שם המשתמש כבר קיים");
        if (data[0].email == obj.email)
            message.push("אימייל כבר קיים");
    });
    return new ResultValid_1.default(message, message.length == 0);
}
exports.default = RegisterValidation;
//# sourceMappingURL=registerValidation.js.map