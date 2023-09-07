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
var Magic_1 = __importDefault(require("@Categories/Magic"));
var Connection_1 = __importDefault(require("@Database/Connection"));
var attack_json_1 = __importDefault(require("@Database/JsonModels/attack.json"));
var move_json_1 = __importDefault(require("@Database/JsonModels/move.json"));
var price_json_1 = __importDefault(require("@Database/JsonModels/price.json"));
var upgradeCards_json_1 = __importDefault(require("@Database/JsonModels/upgradeCards.json"));
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(obj, avatar) {
        var _this = _super.call(this, { tableName: "cards" }) || this;
        _this.GetId = function () { return _this.id; };
        _this.GetName = function () { return _this.name; };
        _this.GetDescription = function () { return _this.description; };
        _this.GetType = function () { return _this.type; };
        _this.GetPrice = function () { return _this.price; };
        _this.GetMove = function () { return _this.move; };
        _this.GetAttack = function () { return _this.attack; };
        _this.GetDelay = function () { return _this.delay; };
        _this.GetMinAvatarLevel = function () { return _this.minAvatarLevel; };
        _this.GetUpgrade = function () { return _this.upgrade; };
        _this.IsFreeze = function () { return _this.freeze; };
        _this.IsExist = function () { return _this.isExist; };
        _this.GetMagic = function () { return _this.magic; };
        _this.GetRank = function () { return _this.rank; };
        _this.GetAvatar = function () { return _this.avatar; };
        _this.GetMaxUpgrade = function () { return _this.maxUpgrade; };
        if (obj) {
            _this.name = (obj.name) ? obj.name : null;
            _this.description = (obj.description) ? obj.description : null;
            _this.type = (obj.type) ? obj.type : null;
            _this.delay = (obj.delay) ? obj.delay : null;
            _this.freeze = (obj.freeze) ? obj.freeze : null;
            _this.minAvatarLevel = (obj.minAvatarLevel) ? obj.minAvatarLevel : null;
            _this.maxUpgrade = (obj.maxUpgrade) ? obj.maxUpgrade : null;
            _this.price = (obj.price) ? new price_json_1.default(obj.price) : null;
            _this.move = (obj.move) ? new move_json_1.default(obj.move) : null;
            _this.attack = (obj.attack) ? new attack_json_1.default(obj.attack) : null;
            _this.upgrade = (obj.upgrade) ? new upgradeCards_json_1.default(obj.upgrade) : null;
            _this.magic = (obj.magicID) ? Magic_1.default.GetMagicById(obj.magicID) : null;
            _this.isExist = (_this.id && _this.name) ? true : false;
        }
        if (avatar)
            _this.SelectSync({
                Fields: ["rank"],
                from: "avatars_cards",
                where: "cardID = ".concat(_this.id, " and avatarID=").concat(avatar.GetId())
            })
                .ValidDB(function (data) {
                _this.avatar = avatar;
                _this.rank = data[0].rank;
            })
                .NoValidDB(function () {
                _this.avatar = null;
            });
        return _this;
    }
    Card.prototype.RankUp = function (num) {
        if (num === void 0) { num = 1; }
        if (!this.avatar || !this.id)
            return;
        if (this.rank < this.maxUpgrade) {
            this.rank += num;
            this.Query("Update avatars_cards Set rank=".concat(this.rank, " Where cardID=").concat(this.id, " and avatarID=").concat(this.avatar.GetId()));
        }
    };
    Card.GetCardById = function (cardID) {
        var card = null;
        new Connection_1.default().SelectSync({
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade", "maxUpgrade"],
            from: 'cards',
            where: "id = ".concat(cardID)
        })
            .ValidDB(function (data) { return card = new Card(data[0]); });
        return card;
    };
    Card.GetCardByName = function (cardName) {
        var card = null;
        new Connection_1.default().SelectSync({
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: 'cards',
            where: "name = '".concat(cardName, "'")
        })
            .ValidDB(function (data) { return card = new Card(data[0]); });
        return card;
    };
    Card.GetCardsByAvatar = function (avatar) {
        var query = {
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: "cards",
            join: "avatars_cards",
            on: "avatars_cards.avatarID = ".concat(avatar.GetId()),
        };
        return new Connection_1.default().Select(query);
    };
    Card.GetCardsByAvatarSync = function (avatar) {
        var cards = [];
        var query = {
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: "cards",
            join: "avatars_cards",
            on: "avatars_cards.avatarID = ".concat(avatar.GetId()),
        };
        new Connection_1.default().SelectSync(query).ValidDB(function (data) { return data.forEach(function (c) { return cards.push(new Card(c)); }); });
        return cards;
    };
    Card.GetCardsByMinAvatarLeven = function (magic) {
        return new Connection_1.default().Select({
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: "cards",
            where: "magicID=".concat(magic.GetId())
        });
    };
    Card.GetCardsByMagic = function (magic) {
        return new Connection_1.default().Select({
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: "cards",
            where: "magicID=".concat(magic.GetId())
        });
    };
    Card.GetCardsByMagicSync = function (magic) {
        var cards = [];
        new Connection_1.default().SelectSync({
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: "cards",
            where: "magicID=".concat(magic.GetId())
        })
            .ValidDB(function (data) { return data.forEach(function (c) { return cards.push(new Card(c)); }); });
        return cards;
    };
    Card.GetCardsByType = function (type) {
        return new Connection_1.default().Select({
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: "cards",
            where: "type='".concat(type, "'")
        });
    };
    Card.GetCardsByTypeSync = function (type) {
        var cards = [];
        new Connection_1.default().SelectSync({
            Fields: ["id", "name", "description", "freeze", "attack", "delay", "magicID", "move", "price", "type", "upgrade", "minAvatarLevel", "maxUpgrade"],
            from: "cards",
            where: "type='".concat(type, "'")
        })
            .ValidDB(function (data) { return data.forEach(function (c) { return cards.push(new Card(c)); }); });
        return cards;
    };
    return Card;
}(Connection_1.default));
exports.default = Card;
//# sourceMappingURL=Card.js.map