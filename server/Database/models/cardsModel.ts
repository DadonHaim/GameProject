import Move from "../jsonModels/move.json";
import Price from "../jsonModels/price.json";
import UpgradeCards from "../jsonModels/upgradeCards.json";

export default class cardsModel{
    public id?              :number;
    public name?            :string;
    public description?     :string;
    public type?            :string;
    public price?           :string;
    public move?            :string;
    public attack?          :string;
    public upgrade?         :string;
    public delay?           :number;
    public freeze?          :boolean;
    public magicID?         :number;

    public static type : "id"|"name"|"description"|"type"|"price"|"move"|"attack"|"upgrade"|"delay"|"magicID"|"freeze";

}
