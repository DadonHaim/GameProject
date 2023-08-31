"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginValidation_1 = __importDefault(require("../../../validations/loginValidation"));
const connection_1 = __importDefault(require("../../../Database/connection"));
function loginUserMethod(obj, x) {
    let validation = (0, loginValidation_1.default)(obj);
    if (validation.valid) {
        let data = connection_1.default.SelectSync({ fields: "*", from: "users", where: `username='${obj.username}' and password='${obj.password}'` });
        x.fillFields(data[0]);
        x.email = "dsd";
    }
    else {
        this.isExist = false;
        this.isLogin = false;
        this.message = validation.messages;
    }
}
exports.default = loginUserMethod;
//# sourceMappingURL=login.js.map