import React from "react";
import BasicFlex from "../../basic/BasicFlex";
import BasicText from "../../basic/BasicText";


export default function SquarePart(props : Props) : JSX.Element{
    return(
        <BasicFlex gfPosition={[[1,1],[1,1]]}  gfCenterXY cursor="pointer"  {...props}>
            <BasicText val={props.text} align="center"/>
        </BasicFlex>
    )
}


interface Props extends GlobalProps{}


