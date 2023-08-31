let socket = { on:(x:any,y:any)=>{} , emit:(x:any,y:any)=>{} };




export function Login1(data){

    console.dir(global.Game)

    global.Game.user.login(data);
    if(global.Game.user.IsLogin())
        socket.emit("ILoginYou" ,"sdasd")
    else
        socket.emit("IFailedLoginYou",{msg:"לא הצלחתי לחבר אותך"})
}