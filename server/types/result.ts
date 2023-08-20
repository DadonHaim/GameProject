class Result<T>{
    public ExistMessage : boolean  | undefined | null;
    public Messages     : string | string[] | null;
    public Valid        : boolean;
    public Return       : T;

    constructor({Messages,Valid}){
        if(Messages == null || Messages == undefined)
            this.ExistMessage = true;
        this.Messages = Messages;
        this.Valid    = Valid;
    }

}