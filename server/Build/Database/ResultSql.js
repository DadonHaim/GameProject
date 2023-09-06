"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultSql = /** @class */ (function () {
    function ResultSql(Data) {
        this.valid = false;
        this.Data = Data;
        if (Array.isArray(Data) &&
            Data[0] != null &&
            Object.keys(Data[0]).length > 0)
            this.valid = true;
    }
    ResultSql.prototype.ValidDB = function (callback) {
        if (this.valid)
            callback(this.Data);
        return this;
    };
    ResultSql.prototype.NoValidDB = function (callback) {
        if (!this.valid)
            callback(this.Data);
        return this;
    };
    return ResultSql;
}());
exports.default = ResultSql;
//# sourceMappingURL=ResultSql.js.map