"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../Database/connection"));
const loginValidation_1 = __importDefault(require("../validations/loginValidation"));
const registerValidation_1 = __importDefault(require("../validations/registerValidation"));
const avatar_1 = __importDefault(require("./avatar"));
class User {
    //#endregion
    //#region Method
    constructor() {
        // if      (obj as ILogin)      this.login(<ILogin>obj)
        // else if (obj as IRegister)   this.register(<IRegister>obj)
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
        this.fillFields = (data) => { for (let key in data)
            this[key] = data[key]; };
        // this.isExist = (this.id && this.username)? true :false ;
        // this.isLogin = (this.id && this.username)? true :false ;
        // if(this.isExist){
        //     this.avatars = Avatar.GetAvatarsByUserId(this.id);
        // }
    }
    updateActiveAvatar(id) { return null; }
    logout() { }
    login(obj) {
        let validation = (0, loginValidation_1.default)(obj);
        if (validation.valid) {
            connection_1.default.SelectSync({ fields: "*", from: "users", where: `username='${obj.username}' and password='${obj.password}'` })
                .ValidData((data) => {
                this.fillFields(data[0]);
                this.isExist = true;
                this.isLogin = true;
                this.avatars = avatar_1.default.GetAvatarsByUserId(this.id);
            })
                .NoValidData(() => {
                this.isExist = false;
                this.isLogin = false;
                this.message = validation.messages;
            });
        }
    }
    register(obj) {
        let validation = (0, registerValidation_1.default)(obj);
        if (validation.valid) {
            this.isExist = true;
            this.isLogin = true;
        }
        else {
            this.isExist = false;
            this.isLogin = false;
            this.message = validation.messages;
        }
    }
    //#endregion
    //#region Statics:
    static getAllUsers() { return null; }
    static getAllUsersLite() { return null; }
}
exports.default = User;
//# sourceMappingURL=user.js.map