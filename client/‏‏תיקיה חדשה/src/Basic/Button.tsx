import React from "react";
import {GlobalStyle} from "../import";

const _Button = React.forwardRef<any,Props>((props,ref)=>{
    const defaltProps:Props = {
        ref           : ref,
        style         :{border:"1px solid",display:"inline-block" ,cursor:"pointer", ...GlobalStyle(props)},
        className     : props.id,
        onLoad        : props.load,
        onChange      : props.change,
        onClick       : props.click,
        // //onDbClick     : props.dbClick,
        onMouseOver   : props.hover,
        onMouseOut    : props.out,
        onCopy        : props.copy,
        onCut         : props.cut,
        onPaste       : props.paste,
        onDrag        : props.drag,
        onDragStart   : props.dragStart,
        onDragEnd     : props.dragEnd,
        onInput       : props.input,
        onSelect      : props.select,
        onContextMenu : props.rightClick,
    }


    return <div {...defaltProps}> {props.text}</div>
})

interface Props extends IProps{
}

const Button = React.memo(_Button)
export default Button