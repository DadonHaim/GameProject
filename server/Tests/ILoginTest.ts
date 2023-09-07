import { ILoginTest } from "@Root/Settings/ILoginSettings";
import Test, { NoValid, Valid } from "./Test";
import User from "@Entities/User/User";

let user:User;


let T2 = new Test({
    name:"בדיקת התחברות למשחק",
    description:"",
    options: ILoginTest
}).start()
.Null("username",(data,msg)=>{
    user = new User().Login(data);
    user.IsLogin()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})
.Null("password",(data,msg)=>{
    user = new User().Login(data);
    user.IsLogin()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})
.LenMin("username",(data,msg)=>{
    user = new User().Login(data);
    user.IsLogin()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})
.LenMin("password",(data,msg)=>{
    user = new User().Login(data);
    user.IsLogin()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})
.LenMax("username",(data,msg)=>{
    user = new User().Login(data);
    user.IsLogin()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})
.LenMax("password",(data,msg)=>{
    user = new User().Login(data);
    user.IsLogin()?  NoValid(msg): Valid(msg);
    user.DeleteDB();
})
.Exist("username",(data,msg)=>{
    user = new User().Login(data);
    user.IsLogin()?  Valid(msg): NoValid(msg);
    user.DeleteDB();
})


// logout:

let T3 = new Test({
    name:"התנתקות",
    description:""
}) 
.SomethingTest("logout:",(msg)=>{
    Test.CreateTestDB()
    let user = new User().Login({username:"Testusername",password:"Testpassword"})
    if(!user.IsLogin()) NoValid(msg+'for {username:"Testusername",password:"Testpassword"} no login')
    else{
        user.Logout();
        if(user.IsLogin()) NoValid(msg+"logout no work")
        else    Valid(msg)
    } 
    user.DeleteDB();
})

//check token:
let T4 = new Test({
    name:"token",
    description:""
}).start()
.SomethingTest("token:",(mgs)=>{
    Test.CreateTestDB()
    let user = new User().Login({username:"Testusername",password:"Testpassword"})
    if(!user.IsLogin()) NoValid(mgs+'for {username:"Testusername",password:"Testpassword"} no login')
    let token = user.GetToken();
    let userToken = User.GetUserByToken(token);
    if(userToken.GetId()!=user.GetId()) NoValid(mgs+" token no created")
    user.Logout();
    userToken = User.GetUserByToken(token);
    if(userToken.GetId()) NoValid(mgs+" token no deleted")
    else Valid(mgs)

    user.DeleteDB();
    userToken.DeleteDB();
})