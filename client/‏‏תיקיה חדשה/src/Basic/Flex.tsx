import React from "react";
import {GlobalStyle} from '../import'


const _Flex = React.forwardRef<any,IProps>((props,ref)=>{
    const defaltProps:IProps = {
        ref           : ref,
        style         : {display:"flex",...GlobalStyle(props)},
        className     : props.id,
        onLoad        : props.load,
        onChange      : props.change,
        onClick       : props.click,
        //onDbClick     : props.dbClick,
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

    return  <div {...defaltProps}>{props.children}</div> 
})

const Flex = React.memo(_Flex);
export default Flex;