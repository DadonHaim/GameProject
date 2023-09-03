export default class CategoriesItemsModel{
    public id?            :number;  
    public name?          :string;      
    public description?   :string;          
    public freeze?        :string;      

    public constructor(obj?:CategoriesItemsModel){
        if(obj){
            this.id          = obj.id;
            this.description = obj.description;
            this.freeze      = obj.freeze;
            this.name        = obj.name;
        }
    }
    public static type : "id"|"name"|"description"|"freeze";

}
