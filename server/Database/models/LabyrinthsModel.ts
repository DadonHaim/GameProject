export default class LabyrinthsModel{
    public id?              :number;
    public name?            :string;
    public description?     :string;
    public freeze?          :boolean;
    public data?            :string;
    public mapID?           :number;

    public static type : "id"|"name"|"description"|"freeze"|"data"|"mapID";
}