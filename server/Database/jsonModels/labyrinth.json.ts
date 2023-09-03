
export default class Labyrinth{
    public frame : _labyrinth[];
    constructor(jsonText:string){}

 }
 
 
 class _labyrinth{
     public monsterData  :{
         monster : any; // Monster,
         rank : number,  
         type : string
     };    
     public mission : boolean;
     public treasure : boolean;
     public prize :{
        exp        :number,         
        silver     :number,     
        gold       :number, 
        diamond    :number,     
        redPowder  :number,         
        items      :any, //Item[],  
     }
 }

// {
//     "frame_1" : {
//         "monster_data":{
//             "monster_ID" : 0,
//             "rank"       : 0,
//             "type"       : "string"
//         },
//         "mission"  : "bool",
//         "Treasure" : "bool",
//         "prize" : {
//             "exp"       : 0,
//             "silver"    : 0,
//             "gold"      : 0,
//             "diamond"   : 0,
//             "redPowder" : 0,
//             "items"     : []
//         }
//     },
//     "frame_∞" : {}
// }