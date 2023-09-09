import { Flex } from "./Container";
import React, {memo} from "react"
import {useDispatch,useSelector} from "react-redux";
import { PageAction } from "../../store/store";
import ConvertPoint from "../../Functions/ConvertPoint";

const Menu = memo((props:IMenuProps)=> <Flex XYcenter {...props}> {props.children}</Flex>)


const Choice = memo((props:IChiceProps)=>{
    let dispath = useDispatch();

    let selectedStyle = props.selected? {
        backgroundColor:"yellow"
    }: (props.onSelected)? props.onSelected: {}; 

    const styleButton :React.CSSProperties={
        display:"inline-flex",
        border :"1px solid",
        cursor:"pointer",
        width: props.width || "20%",
        height: props.height||"40%",
        gridColumn:`${ConvertPoint(props.start)[0]}/${ConvertPoint(props.end)[0]}`,
        gridRow : `${ConvertPoint(props.start)[1]}/${ConvertPoint(props.end)[1]}`,
        justifyContent:"center",
        alignItems:"center",
        ...selectedStyle
    }

    const onclick = ()=>{
        if(props.toPage)    dispath(PageAction.set({type:"thePage",newValue:props.toPage}))
        if(props.toSubPage) dispath(PageAction.set({type:"subPage",newValue:props.toSubPage}))
    }

    return <div style={styleButton} onClick={onclick}> {props.value}</div>
})




interface IMenuProps extends IGlobalProps{
    onSelected?:React.CSSProperties;
}
interface IChiceProps extends IGlobalProps{
    onSelected?:React.CSSProperties;
    selected? : boolean;
    toPage?:string;
    toSubPage?:string;
    value?:string;
}


export{
    Menu,
    Choice
}