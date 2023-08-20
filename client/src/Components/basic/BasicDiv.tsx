import React from "react";
import GlobalStyle from "../../Globals/GlobalStyle";

const _Div = React.forwardRef<any,any>((props,ref)=>{
    return(
        <div ref={ref} className={props.id} style={GlobalStyle(props)} hidden ={props.hidden}>
            {props.children}
        </div>
    )
})

export default _Div