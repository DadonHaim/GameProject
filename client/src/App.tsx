import { useRef, useState } from "react";
import { useSocket } from "./SocketContext";

export default function App(){

    const [x , setX] = useState<any>("out");

    let username = useRef<HTMLInputElement>(null);
    let password = useRef<HTMLInputElement>(null);

    const socket = useSocket();
    
    socket.on("ILoginYou",(data:any)=>{
        console.log(data)
    })
    socket.on("IFailedLoginYou",(data:any)=>{
        console.log(data)
    })

    function OnSubmit(){
        socket.emit("logoutMe")
        let data = {
            username: username.current?.value,
            password: password.current?.value,
        }
        socket.emit("loginMe",data)
    }


    return(
        <div>
            

            <br/>
            <br/>
            <br/>
            

           <input ref={username} name="username" type="text" />
           <input ref={password} name="password" type="text" />
           <button onClick={OnSubmit}>שלח</button>


        </div>
    )
}