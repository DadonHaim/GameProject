"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Avatar {
    constructor() {
        //#endregion
        //#region Flags
        this.isExist = false;
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
        //#endregion
    }
    //#endregion
    //#region Method
    //#endregion
    //#region statics
    static GetAvatarsByUserId(id) {
        return null;
    }
}
exports.default = Avatar;
//# sourceMappingURL=avatar.js.map