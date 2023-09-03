export default class ResultValid{
    public messages : string | string[];
    public valid:boolean;

    public constructor(messages , isValid){
        this.valid = isValid;
        this.messages = messages;
    }

    public Valid(callback:(data:any)=>void):ResultValid{
        if(this.valid)
            callback(this.messages);
        return this;
    }
    public NoValid(callback:(data:any)=>void):ResultValid{
        if(!this.valid)
            callback(this.messages);
        return this;
    }
}


