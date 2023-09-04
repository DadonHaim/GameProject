import Price        from "@JsonModels/price.json";
import sale         from "@JsonModels/sale.json";
import UpgradeItems from "@JsonModels/upgradeItems.json";

export default class ItemsModel{
    public id?               :number;
    public name?             :string;
    public description?      :string;
    public freeze?           :boolean;
    public active?           :boolean;
    public price?            :string;
    public sale?             :string;
    public color?            :string;
    public upgrade?          :string;
    public rank?             :number;
    public minAvatarLevel?   :number;
    public categoryItem?     :string;
    public magicID?          :number; 
}