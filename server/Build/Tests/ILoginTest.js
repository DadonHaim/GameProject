"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ILoginSettings_1 = require("@Root/Settings/ILoginSettings");
var Test_1 = __importStar(require("./Test"));
var User_1 = __importDefault(require("@Entities/User/User"));
var user;
var T2 = new Test_1.default({
    name: "בדיקת התחברות למשחק",
    description: "",
    options: ILoginSettings_1.ILoginTest
}).start()
    .Null("username", function (data, msg) {
    user = new User_1.default().Login(data);
    user.IsLogin() ? (0, Test_1.NoValid)(msg) : (0, Test_1.Valid)(msg);
    user.DeleteDB();
})
    .Null("password", function (data, msg) {
    user = new User_1.default().Login(data);
    user.IsLogin() ? (0, Test_1.NoValid)(msg) : (0, Test_1.Valid)(msg);
    user.DeleteDB();
})
    .LenMin("username", function (data, msg) {
    user = new User_1.default().Login(data);
    user.IsLogin() ? (0, Test_1.NoValid)(msg) : (0, Test_1.Valid)(msg);
    user.DeleteDB();
})
    .LenMin("password", function (data, msg) {
    user = new User_1.default().Login(data);
    user.IsLogin() ? (0, Test_1.NoValid)(msg) : (0, Test_1.Valid)(msg);
    user.DeleteDB();
})
    .LenMax("username", function (data, msg) {
    user = new User_1.default().Login(data);
    user.IsLogin() ? (0, Test_1.NoValid)(msg) : (0, Test_1.Valid)(msg);
    user.DeleteDB();
})
    .LenMax("password", function (data, msg) {
    user = new User_1.default().Login(data);
    user.IsLogin() ? (0, Test_1.NoValid)(msg) : (0, Test_1.Valid)(msg);
    user.DeleteDB();
})
    .Exist("username", function (data, msg) {
    user = new User_1.default().Login(data);
    user.IsLogin() ? (0, Test_1.Valid)(msg) : (0, Test_1.NoValid)(msg);
    user.DeleteDB();
});
// logout:
var T3 = new Test_1.default({
    name: "התנתקות",
    description: ""
})
    .SomethingTest("logout:", function (msg) {
    Test_1.default.CreateTestDB();
    var user = new User_1.default().Login({ username: "Testusername", password: "Testpassword" });
    if (!user.IsLogin())
        (0, Test_1.NoValid)(msg + 'for {username:"Testusername",password:"Testpassword"} no login');
    else {
        user.Logout();
        if (user.IsLogin())
            (0, Test_1.NoValid)(msg + "logout no work");
        else
            (0, Test_1.Valid)(msg);
    }
    user.DeleteDB();
});
//check token:
var T4 = new Test_1.default({
    name: "token",
    description: ""
}).start()
    .SomethingTest("token:", function (mgs) {
    Test_1.default.CreateTestDB();
    var user = new User_1.default().Login({ username: "Testusername", password: "Testpassword" });
    if (!user.IsLogin())
        (0, Test_1.NoValid)(mgs + 'for {username:"Testusername",password:"Testpassword"} no login');
    var token = user.GetToken();
    var userToken = User_1.default.GetUserByToken(token);
    if (userToken.GetId() != user.GetId())
        (0, Test_1.NoValid)(mgs + " token no created");
    user.Logout();
    userToken = User_1.default.GetUserByToken(token);
    if (userToken.GetId())
        (0, Test_1.NoValid)(mgs + " token no deleted");
    else
        (0, Test_1.Valid)(mgs);
    user.DeleteDB();
    userToken.DeleteDB();
});
//# sourceMappingURL=ILoginTest.js.map