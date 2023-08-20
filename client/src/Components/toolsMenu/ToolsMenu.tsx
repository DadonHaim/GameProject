import React from "react"
import SquareMenu from "./SquareMenu/SquareMenu";
import BasicFlex from "../basic/BasicFlex";
import GlobalStyle from "../../Globals/GlobalStyle";
import BasicGrid from "../basic/BasicGrid";

export default function ToolsMenu(props :Props){

    return (
        <>
            <BasicGrid id="ToolsMenu" rows={1} columns={3} width="100%" bgColor="gray" gfCenterXY {...props}> 
                 <SquareMenu gfPosition={[[1,2],[2,2]]} /> 
            </BasicGrid>

        </>
    )
}







interface Props extends GlobalProps{}

