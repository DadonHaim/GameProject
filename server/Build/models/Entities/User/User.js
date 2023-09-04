"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginValidation_1 = __importDefault(require("../validations/loginValidation"));
const registerValidation_1 = __importDefault(require("../validations/registerValidation"));
const avatar_1 = __importDefault(require("./avatar"));
const randomString_1 = __importDefault(require("../functions/randomString"));
const DB_1 = __importDefault(require("../Database/DB"));
class User extends DB_1.default {
    //#endregion
    //#region Method
    constructor() {
        super({ tableName: "users" });
        //#endregion 
        //#region Flags:
        this.isExist = false; //{get;}         
        this.isLogin = false; //{get;}         
        this.isSelectedAvatar = false; //{get; set;}                     
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
        this.getActiveAvatar = () => this.activeAvatar;
        //#endregion
        //#region Sets:
        this.setEmail = (value) => { this.email = value; };
        this.setFirstName = (value) => { this.firstName = value; };
        this.setLastName = (value) => { this.lastName = value; };
        this.setBirthday = (value) => { this.birthday = value; };
        this.setIsSelectedAvatar = (value) => { this.isSelectedAvatar = value; };
        this.fillFields = (data) => { for (let key in data)
            this[key] = data[key]; };
    }
    logout() {
        if (!this.isLogin)
            return;
        this.removeToken();
        this.id = null;
        this.isLogin = false;
    }
    login(obj) {
        if (this.isLogin)
            return;
        (0, loginValidation_1.default)(obj).Valid(() => {
            this.SelectSync({
                Fields: ["id", "username", "email", "firstName", "lastName", "registerDate", "birthday", "freeze", "token"],
                where: `username ='${obj.username}' and password = '${obj.password}'`
            })
                .ValidDB((data) => {
                this.fillFields(data[0]);
                this.isExist = true;
                this.isLogin = true;
                this.createToken();
                this.avatars = avatar_1.default.GetAvatarsByUserId(this);
            })
                .NoValidDB(() => {
                this.isExist = false;
                this.isLogin = false;
            });
        }).NoValid((msgs) => this.message = msgs);
    }
    register(obj) {
        if (this.isLogin)
            return;
        (0, registerValidation_1.default)(obj).Valid(() => {
            this.isExist = true;
            this.isLogin = true;
        }).NoValid(msg => {
            this.isExist = false;
            this.isLogin = false;
            this.message = msg;
        });
    }
    createToken() {
        if (!this.IsLogin())
            return;
        let token = (0, randomString_1.default)(40);
        // this.UpdateSync({token: token})
        this.token = token;
    }
    removeToken() {
        if (!this.IsExist())
            return;
        // this.UpdateSync({token:'',}) 
        this.token = null;
    }
    UpdateActiveAvatar(avatarRef) {
        if (avatarRef == null) {
            this.isSelectedAvatar = false;
            this.activeAvatar = null;
            return;
        }
        this.activeAvatar = this.avatars.find(avatar => avatar.getId() == avatarRef.getId());
        if (this.activeAvatar)
            this.isSelectedAvatar = true;
    }
    //#endregion
    //#region Statics:
    static getAllUsers() { return null; }
    static getAllUsersLite() { return null; }
}
exports.default = User;
//# sourceMappingURL=User.js.map