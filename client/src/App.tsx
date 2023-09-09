import Guest from "./components/Guest/Guest";
import "./components/Global/GlobalStyle.css"
import {useSelector} from "react-redux";


export default function App(){
    let thePage = useSelector((store:any)=>store.page.thePage)

    if(thePage == "Guest")
        return <Guest/>

    else if (thePage == "Game")
        return <></>
    
    
    return <></>
}