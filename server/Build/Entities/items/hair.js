// import Database from "../../Database/connection";
// import price from "../../Database/jsonModels/price.json";
// import sale from "../../Database/jsonModels/sale.json";
// import UpgradeItems from "../../Database/jsonModels/upgradeItems.json";
// import ItemsModel from "../../Database/models/ItemsModel";
// import Item from "../Item";
// export default class Hair extends Item{
//     private name            : string;
//     private description     : string;
//     private freeze          : boolean = false;
//     private color           : string;
//     private price           : price;
//     private sale            : sale;
//     private upgrade         : UpgradeItems;
//     private rank            : number
//     // private magic           : Magic;
//     constructor(obj:ItemsModel){
//         super();
//         this.name        = (obj.name       )? obj.name       : null;
//         this.description = (obj.description)? obj.description: null;
//         this.freeze      = (obj.freeze     )? obj.freeze     : null;
//         this.color       = (obj.color      )? obj.color      : null;
//         this.price       = (obj.price      )? obj.price      : null;
//         this.sale        = (obj.sale       )? obj.sale       : null;
//         this.upgrade     = (obj.upgrade    )? obj.upgrade    : null;
//         this.rank        = (obj.rank       )? obj.rank       : null;
//     }
//     public static getAllHairs() : Hair[]{
//         let hairs :Hair[]= [];
//         Database.SelectSync({
//             fields :["id","name","description","freeze","price","color","sale","upgrade","rank","categoryItem","magicID"],
//             from   : 'items',
//             where  : `categoryItem = 'hair'`
//         })
//         .ValidDB<ItemsModel[]>(data=>{
//             data.forEach((v,i)=> hairs.push(new Hair(v)))
//         })
//         .NoValidDB<any>(err=>{})
//         return hairs;
//     }
// }
//# sourceMappingURL=hair.js.map