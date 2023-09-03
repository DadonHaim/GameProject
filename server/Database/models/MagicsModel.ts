export default class MagicsModel{
    public id?              :number;
    public name?            :string;
    public description?     :string;
    public freeze?          :boolean;

    public static type:"id"|"name"|"description"|"freeze" ;
}
