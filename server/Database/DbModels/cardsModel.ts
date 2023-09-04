import Move          from "@JsonModels/move.json";
import Price         from "@JsonModels/price.json";
import UpgradeCards  from "@JsonModels/upgradeCards.json";

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
    public minAvatarLevel?  :number;
    public freeze?          :boolean;
    public magicID?         :number;
}
