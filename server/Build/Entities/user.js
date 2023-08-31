"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../Database/connection"));
const debug_1 = __importDefault(require("../Dev/debug"));
const loginValidation_1 = __importDefault(require("../validations/loginValidation"));
class User {
    //#endregion
    //#region Method
    constructor(obj) {
        //#endregion 
        //#region Flags:
        this.isExist = false; //{get;}         
        this.isLogin = false; //{get;}         
        this.isSelectedAvatar = false; //{get;}                     
        //#endregion
        //#region Gets:
        this.getId = () => this.id;
        this.getUsername = () => this.username;
        this.getEmail = () => this.email;
        this.getFirstName = () => this.firstName;
        this.getLastName = () => this.lastName;
        this.getBirthday = () => this.birthday;
        this.getRegisterDate = () => this.registerDate;
        this.getBanned = () => this.banned;
        this.getFreeze = () => this.freeze;
        this.getToken = () => this.token;
        this.IsExist = () => this.isExist;
        this.IsLogin = () => this.isLogin;
        this.IsSelectedAvatar = () => this.isSelectedAvatar;
        this.getAvatars = () => this.avatars;
        this.getActiveAvatar = () => this.activeAvatars;
        //#endregion
        //#region Sets:
        this.setEmail = (value) => { this.email = value; };
        this.setFirstName = (value) => { this.firstName = value; };
        this.setLastName = (value) => { this.lastName = value; };
        this.setBirthday = (value) => { this.birthday = value; };
        if (obj)
            this.login(obj);
        else if (obj)
            this.register(obj);
    }
    updateActiveAvatar() { return null; }
    logout() { }
    login(obj) {
        let validation = (0, loginValidation_1.default)(obj);
        if (validation.valid) {
            let data = connection_1.default.SelectSync({ fields: "*", from: "users", where: `username='${obj.username}' and password='${obj.password}'` });
            this.fillFields(data[0]);
            this.isExist = (this.id && this.username) ? true : false;
            this.isLogin = (this.id && this.username) ? true : false;
        }
        else {
            this.isExist = false;
            this.isLogin = false;
            this.message = validation.messages;
        }
        return this;
    }
    register(obj) {
        (0, debug_1.default)(`User->constructor(IRegister)`);
        return this;
    }
    fillFields(data) {
        this.id = (data && data.id) ? data.id : null;
        this.username = (data && data.username) ? data.username : null;
        this.email = (data && data.email) ? data.email : null;
        this.firstName = (data && data.firstName) ? data.firstName : null;
        this.lastName = (data && data.lastName) ? data.lastName : null;
        this.birthday = (data && data.birthday) ? data.birthday : null;
        this.registerDate = (data && data.registerDate) ? data.registerDate : null;
        this.banned = (data && data.banned) ? data.banned : null;
        this.freeze = (data && data.freeze) ? data.freeze : null;
        this.token = (data && data.token) ? data.token : null;
    }
    //#endregion
    //#region Statics:
    static getAllUsers() { return null; }
    static getAllUsersLite() { return null; }
}
exports.default = User;
//# sourceMappingURL=user.js.map