"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultValid = /** @class */ (function () {
    function ResultValid(messages, isValid) {
        this.valid = isValid;
        this.messages = messages;
    }
    ResultValid.prototype.Valid = function (callback) {
        if (this.valid)
            callback(this.messages);
        return this;
    };
    ResultValid.prototype.NoValid = function (callback) {
        if (!this.valid)
            callback(this.messages);
        return this;
    };
    return ResultValid;
}());
exports.default = ResultValid;
//# sourceMappingURL=ResultValid.js.map