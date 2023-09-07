"use strict";
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
        this.options = (this.options) ? obj.options : {};
        console.log("\n\n---test: ".concat(this.name, "---------------------------------------"));
        console.log("\ndescription: " + this.description + "\n\n");
    }
    Test.prototype.start = function (callback) {
        var res = '';
        for (var k in this.options)
            res += "".concat(k, " ) unique:").concat(this.options[k].unique, " , require::").concat(this.options[k].require, " , min:").concat(this.options[k].min, " , max:").concat(this.options[k].max, " , value: ").concat(this.options[k].value, " \n");
        console.log(res);
        if (callback)
            callback();
        return this;
    };
    Test.prototype.AllNull = function (callback) {
        var temp = {};
        for (var key in this.options)
            temp[key] = '';
        var msg = Table("Test ".concat(this.count++, ": all data object empty:")) + PrintObjOneRow(temp);
        callback(temp, msg);
        return this;
    };
    Test.prototype.AllRequireNull = function (callback) {
        var temp = {};
        for (var key in this.options)
            if (this.options[key].require)
                temp[key] = '';
            else
                temp[key] = this.options[key].value;
        var msg = Table("Test ".concat(this.count++, ": all require data object empty:")) + PrintObjOneRow(temp);
        callback(temp, msg);
        return this;
    };
    Test.prototype.Null = function (key, callback) {
        var temp = deepCopy(this.options);
        temp[key] = '';
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " data object empty:")) + PrintObjOneRow(temp);
        callback(temp, msg);
        return this;
    };
    Test.prototype.AllOptinalNull = function (callback) {
        var temp = {};
        for (var key in this.options)
            if (this.options[key].require)
                temp[key] = this.options[key].value;
            else
                temp[key] = '';
        var msg = Table("Test ".concat(this.count++, ": all optional data object empty:") + PrintObjOneRow(temp));
        callback(temp, msg);
        return this;
    };
    Test.prototype.LenMin = function (key, callback) {
        var temp = deepCopy(this.options);
        var res = {};
        if (temp[key].min && temp[key].min > 1)
            temp[key].value = randomChar(temp[key].min - 1, typeof temp[key]);
        for (var k in temp)
            res[k] = temp[k].value;
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " < min:")) + PrintObjOneRow(res);
        callback(res, msg);
        return this;
    };
    Test.prototype.LenMax = function (key, callback) {
        var temp = deepCopy(this.options);
        var res = {};
        if (temp[key].max)
            temp[key].value = randomChar(temp[key].max + 1, typeof temp[key]);
        for (var k in temp)
            res[k] = temp[k].value;
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " < max:")) + PrintObjOneRow(res);
        callback(res, msg);
        return this;
    };
    Test.prototype.Exist = function (key, callback) {
        var temp = deepCopy(this.options);
        var res = {};
        temp[key].value = "Test" + key;
        for (var k in temp)
            res[k] = temp[k].value;
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " is exsit:")) + PrintObjOneRow(res);
        callback(res, msg);
        return this;
    };
    Test.prototype.NoExist = function (key, callback) {
        var temp = deepCopy(this.options);
        var res = {};
        temp[key].value = "Test" + randomChar(7);
        for (var k in temp)
            res[k] = temp[k].value;
        var msg = Table("Test ".concat(this.count++, ": ").concat(key, " is not exsit:")) + PrintObjOneRow(res);
        callback(res, msg);
        return this;
    };
    Test.prototype.SomethingTest = function (mgs, callback) {
        var msg = Table("Test ".concat(this.count++, ":").concat(mgs));
        if (callback)
            callback(msg);
        return this;
    };
    Test.CreateTestDB = function () {
        new Connection_1.default().InsertSync({
            insert: { username: "Testusername", password: "Testpassword", email: "Testemail", firstName: "TestfirstName", lastName: "TestlastName" },
            from: "users"
        });
    };
    Test.DeleteTestDB = function () {
        new Connection_1.default().DeleteSync({ from: "users", where: "username='Testusername'" });
    };
    return Test;
}());
exports.default = Test;
function randomChar(len, type) {
    if (type === void 0) { type = "string"; }
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
    var line = 40;
    for (var i = str.length; i < line; i++)
        str += ' ';
    return str;
}
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        var copyArr = [];
        for (var i = 0; i < obj.length; i++) {
            copyArr[i] = deepCopy(obj[i]);
        }
        return copyArr;
    }
    var copyObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepCopy(obj[key]);
        }
    }
    return copyObj;
}
function PrintObjOneRow(obj) {
    var res = '{ ';
    for (var key in obj)
        if (obj[key].value)
            res += "".concat(key, ":'").concat(obj[key].value, "' | ");
        else
            res += "".concat(key, ":'").concat(obj[key], "' | ");
    res += '}';
    for (var i = res.length; i < 80; i++)
        res += ' ';
    return res;
}
//# sourceMappingURL=Test.js.map