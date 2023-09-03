export default class MissionsModel{
    public id?              :number;
    public name?            :string;
    public description?     :string;
    public freeze?          :boolean;
    public minRank?         :number;
    public difficulty?      :number;
    public goal?            :string;
    public prize?           :string;
    public monsterID?       :number;
    public labyrinthsID?    :number;

    public static type : "id"|"name"|"description"|"freeze"|"minRank"|"difficulty"|"goal"|"prize"|"monsterID"|"labyrinthsID";

}