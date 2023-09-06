"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CrossMidlleWare(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requesed-With , Content-Type , Accept , Authorization');
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Method", 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
}
exports.default = CrossMidlleWare;
//# sourceMappingURL=Cross.js.map