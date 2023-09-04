"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../Database/DB"));
const connection_1 = __importDefault(require("../Database/connection"));
class Magic extends DB_1.default {
    constructor(obj) {
        super({ tableName: "magics" });
        this.isExist = false;
        if (obj && obj) {
            this.id = (obj.id) ? obj.id : null;
            this.name = (obj.name) ? obj.name : null;
            this.description = (obj.description) ? obj.description : null;
            this.freeze = (obj.freeze) ? obj.freeze : null;
            if (this.id && this.name)
                this.isExist = true;
        }
    }
    static getMagicById(magicId) {
        let magic = null;
        connection_1.default.SelectSync({
            Fields: ["id", "name", "description", "freeze"],
            from: 'magics',
            where: `id = ${magicId}`
        })
            .ValidDB(data => {
            magic = new Magic(data[0]);
        })
            .NoValidDB(err => {
        });
        return magic;
    }
}
exports.default = Magic;
//# sourceMappingURL=magic.js.map