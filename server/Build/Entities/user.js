var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Database = require("../Database/connection");
const EventEmitter = require("events");
require("../interface/ILogin");
require("../Database/modules/UserModule");
module.exports = class User extends EventEmitter {
    //method:
    constructor(obj) {
        super();
        //flags:
        this.isExist = false; //{get;}         
        this.isLogin = false; //{get;}         
        this.isSelectedAvatar = false; //{get;}                     
        //Gettings:
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
        //settings
        this.setEmail = (value) => { this.email = value; };
        this.setFirstName = (value) => { this.firstName = value; };
        this.setLastName = (value) => { this.lastName = value; };
        this.setBirthday = (value) => { this.birthday = value; };
        console.dir(this);
    }
    setAllProperties(obj) {
        this.id = obj.getId;
        this.username = obj.getUsername;
        this.email = obj.getEmail;
        this.firstName = obj.getFirstName;
        this.lastName = obj.getLastName;
        this.birthday = obj.getBirthday;
        this.registerDate = obj.getRegisterDate;
        this.banned = obj.getBanned;
        this.freeze = obj.getFreeze;
        this.token = obj.getToken;
        this.
            this.
            this.
            this.
            this.
        ;
    }
    static getUserByID(idOrUsername, Flag) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User(null);
            let data = yield Database.Select({
                fields: ["id", "username", "email", "firstName", "lastName", "birthday", "register_date", "banned", "freeze", "token"],
                from: "users",
                where: `id=${idOrUsername} or username='${idOrUsername}'`
            });
            user.id = data[0].id;
            user.username = data[0].username;
            user.email = data[0].email;
            user.firstName = data[0].firstName;
            user.lastName = data[0].lastName;
            user.birthday = data[0].birthday;
            user.registerDate = data[0].registerDate;
            user.banned = data[0].banned;
            user.freeze = data[0].freeze;
            user.token = data[0].token;
            user.isExist = (Flag) ? Flag.isExist : false;
            user.isLogin = (Flag) ? Flag.isLogin : false;
            return user;
        });
    }
    updateActiveAvatar() { return null; }
    logout() { }
    //statics:
    static getAllUsers() { return null; }
    static getAllUsersLite() { return null; }
    static login(obj) {
        let user = null;
        Database.Select({
            fields: "id",
            from: "user",
            where: `username = ${obj.username} AND password = ${obj.password}`,
        })
            .then((data) => {
            // user = new User(data[0].id ,{isExist:true,isLogin:true});
        })
            .catch((err) => { });
        return user;
    }
    static register(obj) { return null; }
};
//# sourceMappingURL=user.js.map