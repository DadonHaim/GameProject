import User from "@Entities/User/User";
import { IRegisterTest } from "@GSettings/IRegisterSettings";
import Test, { NoValid, Valid } from "./Test";
let user:User;

let T1 = new Test({
    name:"test1",
    description:"",
    options:IRegisterTest
})
.AllNull((data,msg)=>{
    user = new User().Register(data);
    user.IsExist()? NoValid(msg): Valid(msg);
    user.Delete();
})
.AllRequireNull(((data,msg)=>{
    user = new User().Register(data);
    user.IsExist()?  NoValid(msg): Valid(msg);
    user.Delete();
}))
.AllOptinalNull(((data,msg)=>{
    user = new User().Register(data);
    user.IsExist()? Valid(msg) : NoValid(msg)
    user.Delete()
}))

.LenMin("username",(data,msg)=>{
    user = new User().Register(data);
    user.IsExist()?  NoValid(msg): Valid(msg);
    user.Delete();
})
.LenMax("username",(data,msg)=>{
    user = new User().Register(data);
    user.IsExist()?  NoValid(msg): Valid(msg);
    user.Delete();
})

for(let key in T1.options){
    if(!T1.options[key].require) continue;
    T1.Exist(key,(data,msg)=>{
        user = new User().Register(data);
        user.IsExist()?  NoValid(msg): Valid(msg);
        user.Delete();
    })
}



