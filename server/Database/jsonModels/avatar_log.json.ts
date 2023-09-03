export default class AvatarLog{
    public start :{
        hp          : number,
        energy      : number,
        activeItems : any; // Item[],
        cards       : any; // Card[],
    }
    public end  :{
        hp          : number,
        energy      : number,       
    }
    public round    : _round[];
    
    constructor(jsonText:string){}

}

class _round{
    hp          : number;
    energy      : number;
    ActiveCards : any; // Card[];
}



// {
//     "start" :{
//         "active_items" : [],
//         "hp"           : 0,
//         "energy"       : 0,
//         "cards"        : []
//     },
//     "end":{
//         "hp"     : 0,
//         "energy" : 0
//     },

//     "round_1":{
//         "cards" : [],
//         "1" :{
//             "hp"            : 0,
//             "energy"        : 0,
//             "active_cards"  : []
//         },
//         "2" :{
//             "hp"            : 0,
//             "energy"        : 0,
//             "active_cards"  : []
//         },
//         "3" :{
//             "hp"            : 0,
//             "energy"        : 0,
//             "active_cards"  : []
//         }
//     },
//     "round_∞":{}
// }