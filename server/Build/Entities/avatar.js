"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../Database/DB"));
const connection_1 = __importDefault(require("../Database/connection"));
const Inventory_1 = __importDefault(require("./Inventory"));
class Avatar extends DB_1.default {
    //#endregion
    //#region Method
    constructor(avatarObj, user) {
        super({ tableName: "avatars" });
        //#endregion
        //#region Flags
        this.isExist = false;
        this.isActive = false;
        this.isSelectMission = false;
        this.isFreeze = false;
        this.inPage = 'home';
        //#endregion
        //#region Gets      
        this.getId = () => this.id;
        this.getName = () => this.name;
        this.getExp = () => this.exp;
        this.getSilver = () => this.silver;
        this.getGold = () => this.gold;
        this.getRedPowder = () => this.redPowder;
        this.getDiamond = () => this.diamond;
        this.getCreatedDate = () => this.createdDate;
        this.getInventory = () => this.inventory;
        this.getUser = () => this.user;
        this.getActiveMission = () => this.activeMission;
        this.getMagicType = () => this.magicType;
        this.getPage = () => this.page;
        if (avatarObj) {
            this.id = avatarObj.id;
            this.name = avatarObj.name;
            this.exp = avatarObj.exp;
            this.silver = avatarObj.silver;
            this.gold = avatarObj.gold;
            this.redPowder = avatarObj.redPowder;
            this.diamond = avatarObj.diamond;
            this.createdDate = avatarObj.createdDate;
            this.inventory = new Inventory_1.default(this);
            this.isExist = true;
            // this.style = new Styles(this);
        }
        if (user)
            this.user = user;
    }
    EnterToActiveAvatar() {
        if (!this.isExist)
            return;
        this.user.UpdateActiveAvatar(this);
        this.isActive = true;
    }
    OutFromActiveAvatar() {
        if (!this.isExist)
            return;
        this.user.UpdateActiveAvatar(null);
        this.isActive = false;
    }
    //#endregion
    //#region statics
    static GetAvatarsByUserId(user) {
        let avatars = [];
        connection_1.default.SelectSync({
            Fields: ["id", "name", "userID", "createdDate", "exp", "gold", "silver", "redPowder", "diamond", "freeze", "magicID", "missionID"],
            from: "avatars",
            where: `userID = '${user.getId()}'`
        })
            .ValidDB(data => {
            data.forEach((avatar) => {
                avatars.push(new Avatar(avatar, user));
            });
        })
            .NoValidDB(err => { });
        return avatars;
    }
}
exports.default = Avatar;
//# sourceMappingURL=avatar.js.map