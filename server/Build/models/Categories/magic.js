"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = __importDefault(require("@Database/Connection"));
var Magic = /** @class */ (function (_super) {
    __extends(Magic, _super);
    function Magic(obj) {
        var _this = _super.call(this, { tableName: "magics" }) || this;
        _this.isExist = false;
        _this.GetId = function () { return _this.id; };
        _this.GetName = function () { return _this.name; };
        _this.GetDescription = function () { return _this.description; };
        _this.IsFreeze = function () { return _this.freeze; };
        _this.IsExist = function () { return _this.isExist; };
        if (obj) {
            _this.id = (obj.id) ? obj.id : null;
            _this.name = (obj.name) ? obj.name : null;
            _this.description = (obj.description) ? obj.description : null;
            _this.freeze = (obj.freeze) ? obj.freeze : null;
            _this.isExist = (_this.id && _this.name) ? true : false;
        }
        return _this;
    }
    Magic.prototype.GetAllItems = function (sync) {
        var query = "Select * from items where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.prototype.GetAllCards = function (sync) {
        var query = "Select * from cards where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.prototype.GetAllAvatars = function (sync) {
        var query = "Select * from avatars where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.prototype.GetAllMissions = function (sync) {
        var query = "Select * from missions where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.prototype.GetAllItemsLite = function (sync) {
        var query = "Select id,name,description from items where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.prototype.GetAllCardsLite = function (sync) {
        var query = "Select * from cards where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.prototype.GetAllAvatarsLite = function (sync) {
        var query = "Select * from avatars where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.prototype.GetAllMissionsLite = function (sync) {
        var query = "Select * from missions where magicID=".concat(this.id);
        if (sync)
            return new Connection_1.default().QuerySync(query);
        return new Connection_1.default().Query(query);
    };
    Magic.GetMagicById = function (magicId) {
        var magic = null;
        new Connection_1.default().SelectSync({
            Fields: ["id", "name", "description", "freeze"],
            from: 'magics',
            where: "id = ".concat(magicId)
        })
            .ValidDB(function (data) { return magic = new Magic(data[0]); });
        return magic;
    };
    Magic.GetMagicByName = function (magicName) {
        var magic = null;
        new Connection_1.default().SelectSync({
            Fields: ["id", "name", "description", "freeze"],
            from: 'magics',
            where: "name = '".concat(magicName, "'")
        })
            .ValidDB(function (data) { return magic = new Magic(data[0]); });
        return magic;
    };
    Magic.GetListMagics = function () {
        var magics = [];
        new Connection_1.default().SelectSync({
            Fields: ["id", "name", "description", "freeze"],
            from: 'magics'
        })
            .ValidDB(function (data) { return data.forEach(function (magic) { return magics.push(new Magic(magic)); }); });
        return magics;
    };
    Magic.GetAllByMagic = function (magic, sync) {
        if (sync === void 0) { sync = false; }
        return ({
            Items: magic.GetAllItems(sync),
            Cards: magic.GetAllCards(sync),
            Avatars: magic.GetAllAvatars(sync),
            Missions: magic.GetAllMissions(sync),
        });
    };
    return Magic;
}(Connection_1.default));
exports.default = Magic;
//# sourceMappingURL=Magic.js.map