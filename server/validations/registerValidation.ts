import Database from "@Database/Connection";
import ResultValid from "./ResultValid";
import { IRegisterSettings  as setting} from "@Root/Settings/IRegisterSettings";



export default function RegisterValidation(obj:IRegister){
    let message =[];

    if(!obj.username ) message.push("שם משתמש חסר")
    if(!obj.password ) message.push("סיסמה חסרה")
    if(!obj.email )    message.push("אימיל חסר")

    if(message.length==0){
        if(obj.username.length > setting.username.max)                                  message.push("שם המשתמש ארוך מדי")
        if(obj.username.length < setting.username.min)                                  message.push("שם המשתמש קצר מדי")
        if(obj.password.length < setting.password.min)                                  message.push("הסיסמה קצרה מדי")
        if(obj.password.length >setting.password.max)                                   message.push("הסיסמה ארוכה מדי")
        if(obj.email.length < setting.email.min)                                        message.push("האימל קצר מדי")
        if(obj.email.length >setting.email.max)                                         message.push("האימל ארוך מדי")
        if(obj.firstName.length<setting.firstName.min)                                  message.push("שם פרטי קצר  מדי")
        if(obj.firstName.length >setting.firstName.max)                                 message.push("שם פרטי ארוך  מדי")
        if(obj.lastName.length <setting.lastName.min)                                   message.push("שם משפחה קצר  מדי")
        if(obj.lastName.length >setting.lastName.max)                                   message.push("שם משפחה ארוך  מדי")
    }


    new Database().QuerySync(`Select username,email from users where username = '${obj.username}'or email='${obj.email}'`)
    .ValidDB(data=>{
        if(data[0].username == obj.username)
            message.push("שם המשתמש כבר קיים")
        if(data[0].email == obj.email)
            message.push("אימייל כבר קיים")
    })
    
    return new ResultValid(message,message.length==0);
}


