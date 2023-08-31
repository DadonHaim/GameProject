"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login1 = void 0;
let socket = { on: (x, y) => { }, emit: (x, y) => { } };
function Login1(data) {
    console.dir(global.Game);
    global.Game.user.login(data);
    if (global.Game.user.IsLogin())
        socket.emit("ILoginYou", "sdasd");
    else
        socket.emit("IFailedLoginYou", { msg: "לא הצלחתי לחבר אותך" });
}
exports.Login1 = Login1;
//# sourceMappingURL=loginSockts.js.map