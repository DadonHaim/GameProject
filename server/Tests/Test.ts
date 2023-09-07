import UserModel from '@Database/DbModels/UserModel';
import Database from '../Database/Connection';
var colors = require('colors/safe');

interface ITest{
    name: string;
    description : string;
    options? : any;
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
        this.name        = obj.name                         ;  
        this.description = obj.description                  ;          
        this.options     = (this.options)? obj.options :{}  ;            
        
        console.log(`\n\n---test: ${this.name}---------------------------------------`)
        console.log("\ndescription: "+this.description + "\n\n")
    }         


    start(callback?:()=>void):Test{
        let res='';
        for(let k in this.options )
            res+=`${k} ) unique:${this.options[k].unique} , require::${this.options[k].require} , min:${this.options[k].min} , max:${this.options[k].max} , value: ${this.options[k].value} \n`
        console.log(res)
        if(callback) callback();
        return this
    }

    AllNull(callback:(obj:any,msg?:string)=>void):Test{
        let temp ={}
        for(let key in this.options) temp[key] = '';
        let msg = Table(`Test ${this.count++}: all data object empty:`)+PrintObjOneRow(temp);
        callback(temp,msg)
        return this;
    }

    AllRequireNull(callback:(obj:any,msg?:string)=>void):Test{
        let temp ={}
        for(let key in this.options)
            if(this.options[key].require)  temp[key] = '';
            else temp[key] = this.options[key].value;
        let msg =  Table(`Test ${this.count++}: all require data object empty:`)+PrintObjOneRow(temp);
        callback(temp,msg)
        return this;
    }
    Null<T=any>(key:T,callback:(obj:any,msg?:string)=>void):Test{
        let temp = deepCopy(this.options)
        temp[key] = '';
        let msg =  Table(`Test ${this.count++}: ${key} data object empty:`)+PrintObjOneRow(temp);
        callback(temp,msg)
        return this;
    }


    AllOptinalNull(callback:(obj:any,msg?:string)=>void):Test{
        let temp ={}
        for(let key in this.options)
            if(this.options[key].require) temp[key]=this.options[key].value;
            else temp[key]='';
        let msg =  Table(`Test ${this.count++}: all optional data object empty:`+PrintObjOneRow(temp));
        callback(temp,msg)
        return this;
    }

    LenMin<T=any>(key,callback:(obj:any,msg?:string)=>void):Test{
        let temp = deepCopy(this.options)
        let res = {};
        if(temp[key].min && temp[key].min>1)
            temp[key].value = randomChar(temp[key].min-1, typeof temp[key])
        for(let k in temp) res[k]=temp[k].value;
        let msg =  Table(`Test ${this.count++}: ${key} < min:`)+PrintObjOneRow(res);
        callback(res,msg)
        return this;
    }

    LenMax<T=any>(key,callback:(obj:any,msg?:string)=>void):Test{
        let temp = deepCopy(this.options)
        let res = {};
        if(temp[key].max) temp[key].value = randomChar(temp[key].max+1, typeof temp[key]);
        for(let k in temp)res[k]=temp[k].value
        let msg =  Table(`Test ${this.count++}: ${key} < max:`)+PrintObjOneRow(res);
        callback(res,msg)
        return this;
    }

    Exist(key,callback:(obj:any,msg?:string)=>void):Test{
        let temp = deepCopy(this.options)
        let res = {};
        temp[key].value = "Test"+key
        for(let k in temp)res[k]=temp[k].value
        let msg =  Table(`Test ${this.count++}: ${key} is exsit:`)+PrintObjOneRow(res);
        callback(res,msg)
        return this;
    }
    NoExist(key,callback:(obj:any,msg?:string)=>void):Test{
        let temp = deepCopy(this.options)
        let res = {};
        temp[key].value = "Test"+randomChar(7)
        for(let k in temp)res[k]=temp[k].value
        let msg =  Table(`Test ${this.count++}: ${key} is not exsit:`)+PrintObjOneRow(res);
        callback(res,msg)
        return this;
    }

    SomethingTest(mgs,callback?:(mgs?:string)=>void):Test{
        let msg =  Table(`Test ${this.count++}:${mgs}`);
        if(callback) callback(msg)
        return this;
    }

    static CreateTestDB(){
        new Database().InsertSync<UserModel>({
            insert:{username:"Testusername",password:"Testpassword",email:"Testemail",firstName:"TestfirstName",lastName:"TestlastName"},
            from: "users"
        })
    }
    static DeleteTestDB(){
        new Database().DeleteSync({from:"users",where:"username='Testusername'"})
    }

}




function randomChar(len:number , type:string="string"){
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
    let line =  40;
    for(let i=str.length; i<line;i++)
        str+=' '
    return str;
}


function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      const copyArr = [];
      for (let i = 0; i < obj.length; i++) {
        copyArr[i] = deepCopy(obj[i]);
      }
      return copyArr;
    }
  
    const copyObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copyObj[key] = deepCopy(obj[key]);
      }
    }
  
    return copyObj;
  }

function PrintObjOneRow(obj){
let res='{ ';
for(let key in obj)
    if(obj[key].value)
        res+=`${key}:'${obj[key].value}' | `
    else
        res+=`${key}:'${obj[key]}' | `

res+='}'
for(let i=res.length; i<80;i++) res+=' '
return res
}

