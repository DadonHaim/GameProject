import React from "react";
import {GlobalStyle} from '../import'

const _Text = React.forwardRef<any,IProps>((props,ref)=>{
    const defaltProps:IProps = {
        ref           : ref,
        style         : GlobalStyle(props),
        className     : props.id,
        onLoad        : props.load,
        onChange      : props.change,
        onClick       : props.click,
        onDbClick     : props.dbClick,
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
    return <span {...defaltProps}> {props.val} </span>
})

const Text = React.memo(_Text);
export default Text;