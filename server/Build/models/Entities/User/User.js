"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var randomString_1 = __importDefault(require("@Functions/randomString"));
var DB_1 = __importDefault(require("@Database/DB"));
var Connection_1 = __importDefault(require("@Database/Connection"));
var Avatar_1 = __importDefault(require("@Entities/Avatar/Avatar"));
var registerValidation_1 = __importDefault(require("@Validations/registerValidation"));
var loginValidation_1 = __importDefault(require("@Validations/loginValidation"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    //#endregion
    //#region Method
    function User(obj) {
        var _this = _super.call(this, { tableName: "users" }) || this;
        //#endregion 
        //#region Flags:
        _this.isExist = false; //{get;}         
        _this.isLogin = false; //{get;}         
        _this.isSelectedAvatar = false; //{get; set;}                     
        //#endregion
        //#region Gets:
        _this.GetId = function () { return _this.id; };
        _this.GetUsername = function () { return _this.username; };
        _this.GetEmail = function () { return _this.email; };
        _this.GetFirstName = function () { return _this.firstName; };
        _this.GetLastName = function () { return _this.lastName; };
        _this.GetBirthday = function () { return _this.birthday; };
        _this.GetRegisterDate = function () { return _this.registerDate; };
        _this.GetBanned = function () { return _this.banned; };
        _this.GetFreeze = function () { return _this.freeze; };
        _this.GetToken = function () { return _this.token; };
        _this.IsExist = function () { return _this.isExist; };
        _this.IsLogin = function () { return _this.isLogin; };
        _this.IsSelectedAvatar = function () { return _this.isSelectedAvatar; };
        _this.GetAvatars = function () { return _this.avatars; };
        _this.GetActiveAvatar = function () { return _this.activeAvatar; };
        //#endregion
        //#region Sets:
        _this.setEmail = function (value) { _this.email = value; };
        _this.setFirstName = function (value) { _this.firstName = value; };
        _this.setLastName = function (value) { _this.lastName = value; };
        _this.setBirthday = function (value) { _this.birthday = value; };
        _this.setIsSelectedAvatar = function (value) { _this.isSelectedAvatar = value; };
        _this.fillFields = function (data) { for (var key in data)
            _this[key] = data[key]; };
        if (obj) {
            _this.id = (obj.id) ? obj.id : null;
            _this.username = (obj.username) ? obj.username : null;
            _this.email = (obj.email) ? obj.email : null;
            _this.firstName = (obj.firstName) ? obj.firstName : null;
            _this.lastName = (obj.lastName) ? obj.lastName : null;
            _this.birthday = (obj.birthday) ? obj.birthday : null;
            _this.registerDate = (obj.registerDate) ? obj.registerDate : null;
            _this.banned = (obj.banned) ? obj.banned : null;
            _this.freeze = (obj.freeze) ? obj.freeze : null;
            _this.token = (obj.token) ? obj.token : null;
        }
        _this.isExist = (_this.id && _this.username) ? true : false;
        return _this;
    }
    User.prototype.Logout = function () {
        if (!this.isLogin)
            return;
        this.removeToken();
        this.id = null;
        this.isLogin = false;
        return this;
    };
    User.prototype.Login = function (obj) {
        var _this = this;
        if (this.isLogin)
            return;
        (0, loginValidation_1.default)(obj).Valid(function () {
            _this.SelectSync({
                Fields: ["id", "username", "email", "firstName", "lastName", "registerDate", "birthday", "freeze", "token"],
                where: "username ='".concat(obj.username, "' and password = '").concat(obj.password, "'")
            })
                .ValidDB(function (data) {
                _this.fillFields(data[0]);
                _this.isExist = true;
                _this.isLogin = true;
                _this.createToken();
                _this.avatars = Avatar_1.default.GetAvatarsByUserId(_this);
            })
                .NoValidDB(function () {
                _this.isExist = false;
                _this.isLogin = false;
            });
        }).NoValid(function (msgs) { return _this.message = msgs; });
        return this;
    };
    User.prototype.Register = function (obj) {
        var _this = this;
        if (this.isLogin)
            return;
        (0, registerValidation_1.default)(obj).Valid(function () {
            _this.isExist = true;
            _this.isLogin = false;
            _this.username = obj.username;
            _this.QuerySync("insert into users (username,password,email,firstName,lastName) Values ('".concat(obj.username, "','").concat(obj.password, "','").concat(obj.email, "','").concat(obj.firstName, "','").concat(obj.lastName, "')"));
        }).NoValid(function (msg) {
            _this.isExist = false;
            _this.isLogin = false;
            _this.message = msg;
        });
        return this;
    };
    User.prototype.Delete = function () {
        Connection_1.default.QuerySync("Delete from users where username='".concat(this.username, "'"));
        this.isExist = false;
    };
    User.prototype.createToken = function () {
        if (!this.IsLogin())
            return;
        var token = (0, randomString_1.default)(40);
        this.QuerySync("Update users Set token='".concat(token, "' Where id=").concat(this.id));
        this.token = token;
    };
    User.prototype.removeToken = function () {
        if (!this.IsExist())
            return;
        this.QuerySync("Update users Set token='' Where id=".concat(this.id));
        this.token = null;
    };
    User.prototype.UpdateActiveAvatar = function (avatarRef) {
        if (avatarRef == null) {
            this.isSelectedAvatar = false;
            this.activeAvatar = null;
            return;
        }
        this.activeAvatar = this.avatars.find(function (avatar) { return avatar.GetId() == avatarRef.GetId(); });
        if (this.activeAvatar)
            this.isSelectedAvatar = true;
    };
    //#endregion
    //#region Statics:
    User.getAllUsers = function () {
        return Connection_1.default.Select({
            Fields: ['id', 'username', 'email', 'firstName', 'lastName', 'birthday', 'registerDate', 'freeze', 'token'],
            from: "users",
        });
    };
    User.getAllUsersSync = function () {
        var user = [];
        Connection_1.default.SelectSync({
            Fields: ['id', 'username', 'email', 'firstName', 'lastName', 'birthday', 'registerDate', 'freeze', 'token'],
            from: "users",
        })
            .ValidDB(function (data) { return data.forEach(function (u) { return user.push(new User(u)); }); });
        return user;
    };
    User.GetUserById = function (userID) {
        var user = null;
        Connection_1.default.SelectSync({
            Fields: ['id', 'username', 'email', 'firstName', 'lastName', 'birthday', 'registerDate', 'freeze', 'token'],
            from: "users",
            where: "id='".concat(userID, "'")
        })
            .ValidDB(function (data) { return user = new User(data[0]); });
        return user;
    };
    User.GetUserByUsername = function (username) {
        var user = null;
        Connection_1.default.SelectSync({
            Fields: ['id', 'username', 'email', 'firstName', 'lastName', 'birthday', 'registerDate', 'freeze', 'token'],
            from: "users",
            where: "username='".concat(username, "'")
        })
            .ValidDB(function (data) { return user = new User(data[0]); });
        return user;
    };
    User.GetUserByToken = function (token) {
        var user = null;
        Connection_1.default.SelectSync({
            Fields: ['id', 'username', 'email', 'firstName', 'lastName', 'birthday', 'registerDate', 'freeze', 'token'],
            from: "users",
            where: "token='".concat(token, "'")
        })
            .ValidDB(function (data) { return user = new User(data[0]); });
        return user;
    };
    return User;
}(DB_1.default));
exports.default = User;
//# sourceMappingURL=User.js.map