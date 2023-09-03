import Price from "../jsonModels/price.json";
import sale from "../jsonModels/sale.json";
import UpgradeItems from "../jsonModels/upgradeItems.json";

export default class ItemsModel{
    public id?               :number;
    public name?             :string;
    public description?      :string;
    public freeze?           :boolean;
    public active?           :boolean;
    public price?            :Price;
    public sale?             :string;
    public color?            :string;
    public upgrade?          :string;
    public rank?             :number;
    public categoryItem?     :string;
    public magicID?          :number;

    public static type: 'id'|'name'|'description'|'freeze'|'price'|'sale'|'color' |'upgrade'|'rank'|'categoryItem' |'magicID' ;        
}