import Database from '../Database/Connection';
var colors = require('colors/safe');

interface ITest{
    name: string;
    description : string;
    options : any;
}

export function Valid(message:any=""){
    console.log(message+colors.green('Valid'));
}
export function NoValid(message="",errorCode=0){
    console.log(message+colors.red("no Valid"));
}


export default class Test{
    name :string;
    description:string;
    options: any ={}
    count = 1

    constructor(obj:ITest){
        this.name            = obj.name                 ;  
        this.description     = obj.description          ;          
        this.options         = obj.options;            
        
        console.log(`---test: ${this.name}---------------------------------------`)
        console.log("\ndescription: "+this.description + "\n\n")
    }         


    
    AllNull(callback:(obj:any,msg?:string)=>void):Test{
        let msg = Table(`Test ${this.count++}: all data object empty:`);
        let temp ={}
        for(let key in this.options) temp[key] = '';
        callback(temp,msg)
        return this;
    }

    AllRequireNull(callback:(obj:any,msg?:string)=>void):Test{
        let msg =  Table(`Test ${this.count++}: all require data object empty:`);
        let temp ={}
        for(let key in this.options)
            if(this.options[key].require)  temp[key] = '';
            else temp[key] = this.options[key].value;
        callback(temp,msg)
        return this;
    }

    AllOptinalNull(callback:(obj:any,msg?:string)=>void):Test{
        let msg =  Table(`Test ${this.count++}: all optional data object empty:`);
        let temp ={}
        for(let key in this.options)
            if(this.options[key].require) temp[key]=this.options[key].value;
            else temp[key]='';
        callback(temp,msg)
        return this;
    }

    LenMin<T=any>(key,callback:(obj:any,msg?:string)=>void):Test{
        let msg =  Table(`Test ${this.count++}: ${key} < min:`);
        let temp ={...this.options} ,res = {};
        if(temp[key].min &&temp[key].min>1) temp[key].value = randomChar(temp[key].min-1, typeof temp[key])
        for(let k in temp) res[k]=temp[k].value;
        callback(res,msg)
        return this;
    }

    LenMax<T=any>(key,callback:(obj:any,msg?:string)=>void):Test{
        let msg =  Table(`Test ${this.count++}: ${key} < max:`);
        let temp ={...this.options},res = {};
        if(temp[key].max) temp[key].value = randomChar(temp[key].max+1, typeof temp[key]);
        for(let k in temp)res[k]=temp[k].value
        callback(res,msg)
        return this;
    }

    Exist(key,callback:(obj:any,msg?:string)=>void):Test{
        let msg =  Table(`Test ${this.count++}: ${key} is exsit:`);
        let temp ={...this.options},res = {};
        temp[key].value = "Test"+key
        for(let k in temp)res[k]=temp[k].value
        callback(res,msg)
        return this;
    }


    static CreateTestDB(){
        Database.QuerySync(`Insert INTO users ("username","password","email","firstName","lastName","birthday") Values ('Testusername','Testpassword','Testemail','TestfirstName','TestlastName','Testbirthday')`);
    }
    static DeleteTestDB(){
        Database.QuerySync(` Delete users where username='Testusername'`);
    }

}




function randomChar(len:number , type:string){
    let result = '';
    const characters = '123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < len) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    if(type =="number")
        return Number.parseInt(result);

    return result;
}


function Table(str:string):string{
    let line =  50;
    for(let i=str.length; i<line;i++)
        str+=' '
    return str;

}