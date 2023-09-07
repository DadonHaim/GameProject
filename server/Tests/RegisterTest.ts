import User from "@Entities/User/User";
import { IRegisterTest } from "@GSettings/IRegisterSettings";
import Test, { NoValid, Valid } from "./Test";
let user:User;

let T1 = new Test({
    name:"בדיקת הרשמה למשחק",
    description:"",
    options:IRegisterTest
})
.AllNull((data,msg)=>{
    user = new User().Register(data);
    user.IsExist()? NoValid(msg): Valid(msg);
    user.DeleteDB();
})
.AllRequireNull(((data,msg)=>{
    user = new User().Register(data);
    user.IsExist()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
}))
.AllOptinalNull(((data,msg)=>{
    user = new User().Register(data);
    user.IsExist()? Valid(msg) : NoValid(msg)
    user.DeleteDB()
}))

for(let k in T1.options){
    T1.LenMin(k,(data,msg)=>{
        user = new User().Register(data);
        user.IsExist()?  NoValid(msg): Valid(msg);
        user.DeleteDB();
    })
    T1.LenMax(k,(data,msg)=>{
        user = new User().Register(data);
        user.IsExist()?  NoValid(msg): Valid(msg);
        user.DeleteDB();
    })
}

T1.Exist("username",(data,msg)=>{
    user = new User().Register(data);
    user.IsExist()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})

.Exist("email",(data,msg)=>{
    user = new User().Register(data);
    user.IsExist()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})





