"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResultValid {
    constructor(messages, isValid) {
        this.valid = isValid;
        this.messages = messages;
    }
    Valid(callback) {
        if (this.valid)
            callback(this.messages);
        return this;
    }
    NoValid(callback) {
        if (!this.valid)
            callback(this.messages);
        return this;
    }
}
exports.default = ResultValid;
//# sourceMappingURL=ResultValid.js.map