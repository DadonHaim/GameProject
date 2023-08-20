import React from "react";
import BasicGrid from "./Components/basic/BasicGrid";
import ToolsMenu from "./Components/toolsMenu/ToolsMenu";




export default function App(){
    let isLoading = React.useState("false");

    React.useEffect(()=>{
        if(!isLoading){
            fetch("http://localhost:5000/api/start").then((data)=>{

                
            })
        }
    },[])


    let GridRef :any = React.useRef();
    return(
        <>
            <BasicGrid ref={GridRef} id="App" position='absolute' top={10} left="10%" rows={20} columns={20} height="90vh" width="80vw" margin="auto" border>
                <ToolsMenu gfPosition={[[17,1],[21,21]]} /> 
            </BasicGrid>
        </>
    )

} 