import React from "react";
import SquarePart from "./SquarePart";
import BasicGrid from "../../basic/BasicGrid";

export default function SquareMenu(props : Props): JSX.Element{

    return (
        <BasicGrid id="SquareMenu" rows={2} columns={2} gfGap={1}  height="80%" width="40%" gfCenter  {...props}>
            <SquarePart gfPosition={[[1,2],[2,3]]} bgColor="red"    text="a" api =""/>
            <SquarePart gfPosition={[[1,1],[2,2]]} bgColor="blue"   text="a"/>
            <SquarePart gfPosition={[[2,1],[3,2]]} bgColor="yellow" text="a"/>
            <SquarePart gfPosition={[[2,2],[3,3]]} bgColor="green"  text="a"/>
        </BasicGrid>
    )
}


interface Props extends GlobalProps{}


