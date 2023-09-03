export default class MonsterModel{
    public id?              :number;
    public name?            :string;
    public description?     :string;
    public freeze?          :boolean;
    public rankPower?       :number;

    public static type : "id"|"name"|"description"|"freeze"|"rankPower";

}