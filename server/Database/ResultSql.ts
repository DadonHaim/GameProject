export default class ResultSql{
    public Data :any;
    public valid :boolean = false;

    public constructor(Data){
        this.Data=Data;
        if(
            Array.isArray(Data) &&
            Data[0]  != null    &&
            Data[0]?.id
        )
        this.valid = true; 
    }

    public ValidDB<Model=any>(callback:(data:Model)=>void):ResultSql{
        if(this.valid)
            callback(this.Data);
        return this;
    }
    public NoValidDB<Model=any>(callback:(data:Model)=>void):ResultSql{
        if(!this.valid)
            callback(this.Data);
        return this;
    }
}




