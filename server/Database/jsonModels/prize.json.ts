export default class Prize{
    public exp        :number;              
    public silver     :number;          
    public gold       :number;      
    public diamond    :number;          
    public redPowder  :number;              
    public items      :any; // Item[];          
    constructor(jsonText:string){}

}


// {
//     "exp"       : 0,
//     "silver"    : 0,
//     "gold"      : 0,
//     "diamond"   : 0,
//     "redPowder" : 0,
//     "items"     : []
// }