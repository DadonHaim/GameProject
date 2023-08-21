import React, { useState } from "react";
import BasicGrid from "./Components/basic/BasicGrid";
import ToolsMenu from "./Components/toolsMenu/ToolsMenu";
import Div from "./Components/basic/BasicDiv"


export default function App(){

    let [isLoad , setIsLoad] = useState(false);
    let [isLogin , setIsLogin] = useState(false);

    React.useEffect(()=>{
        fetch
    },[])

    return(
        <BasicGrid  id="App" border width={1000} height={800} margin="15px auto" rows={10} columns={10}>

            

        </BasicGrid>
    )
} 






