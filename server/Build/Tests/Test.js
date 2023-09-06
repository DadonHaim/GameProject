"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoValid = exports.Valid = void 0;
var Connection_1 = __importDefault(require("../Database/Connection"));
var colors = require('colors/safe');
function Valid(message) {
    if (message === void 0) { message = ""; }
    console.log(message + colors.green('Valid'));
}
exports.Valid = Valid;
function NoValid(message, errorCode) {
    if (message === void 0) { message = ""; }
    if (errorCode === void 0) { errorCode = 0; }
    console.log(message + colors.red("no Valid"));
}
exports.NoValid = NoValid;
var Test = /** @class */ (function () {
    function Test(obj) {
        this.options = {};
        this.count = 1;
        this.name = obj.name;
        this.description = obj.description;
        this.options = obj.options;
        console.log("---test: ".concat(this.name, "---------------------------------------"));
        console.log("\ndescription: " + this.description + "\n\n");
    }
    Test.prototype.AllNull = function (callback) {
        var msg = Table("Test ".concat(this.count++, ": all data object empty:"));
        var temp = {};
        for (var key in this.options)
            temp[key] = '';
        callback(temp, msg);
        return this;
    };
    Test.prototype.AllRequireNull = function (callback) {
        var msg = Table("Test ".concat(this.count++, ": all require data object empty:"));
        var temp = {};
        for (var key in this.options)
            if (this.options[key].require)
                temp[key] = '';
            else
                temp[key] = this.options[key].value;
        callback(temp, msg);
        return this;
    };
    Test.prototype.AllOptinalNull = function (callback) {
        var msg = Table("Test ".concat(this.count++, ": all optional data object empty:"));
        var temp = {};
        for (var key in this.options)
            if (this.options[key].require)
                temp[key] = this.options[key].value;
            else
                temp[key] = '';
        callback(temp, msg);
        return this;
    };
    Test.prototype.LenMin = function (key, callback) {
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " < min:"));
        var temp = __assign({}, this.options), res = {};
        if (temp[key].min && temp[key].min > 1)
            temp[key].value = randomChar(temp[key].min - 1, typeof temp[key]);
        for (var k in temp)
            res[k] = temp[k].value;
        callback(res, msg);
        return this;
    };
    Test.prototype.LenMax = function (key, callback) {
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " < max:"));
        var temp = __assign({}, this.options), res = {};
        if (temp[key].max)
            temp[key].value = randomChar(temp[key].max + 1, typeof temp[key]);
        for (var k in temp)
            res[k] = temp[k].value;
        callback(res, msg);
        return this;
    };
    Test.prototype.Exist = function (key, callback) {
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " is exsit:"));
        var temp = __assign({}, this.options), res = {};
        temp[key].value = "Test" + key;
        for (var k in temp)
            res[k] = temp[k].value;
        callback(res, msg);
        return this;
    };
    Test.CreateTestDB = function () {
        Connection_1.default.QuerySync("Insert INTO users (\"username\",\"password\",\"email\",\"firstName\",\"lastName\",\"birthday\") Values ('Testusername','Testpassword','Testemail','TestfirstName','TestlastName','Testbirthday')");
    };
    Test.DeleteTestDB = function () {
        Connection_1.default.QuerySync(" Delete users where username='Testusername'");
    };
    return Test;
}());
exports.default = Test;
function randomChar(len, type) {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < len) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    if (type == "number")
        return Number.parseInt(result);
    return result;
}
function Table(str) {
    var line = 50;
    for (var i = str.length; i < line; i++)
        str += ' ';
    return str;
}
//# sourceMappingURL=Test.js.map