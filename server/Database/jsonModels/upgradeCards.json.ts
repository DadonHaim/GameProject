export default class UpgradeCards{
    public leven1   :_upgradeCards;
    public leven2   :_upgradeCards;
    public leven3   :_upgradeCards;
    public leven4   :_upgradeCards;
    public leven5   :_upgradeCards;
    public leven6   :_upgradeCards;
}


class _upgradeCards{
    public damage        : number;
    public energy        : number;
    public require_leven : number;
    public silver        : number;
    public gold          : number;
    public diamond       : number;
    public redPowder     : number;
}



// {
//     "leven_1" : {
//         "damage"        : 0,
//         "energy"        : 0,
//         "require_leven" : 0,
//         "silver"        : 0,
//         "gold"          : 0,
//         "diamond"       : 0,
//         "redPowder"     : 0
//     },
//     "leven_6" : {
//          ...
//     }
// }