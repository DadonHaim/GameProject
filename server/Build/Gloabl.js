"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./Entities/user"));
class Game {
    constructor() {
        this.user = new user_1.default();
    }
}
exports.default = new Game();
//# sourceMappingURL=Gloabl.js.map