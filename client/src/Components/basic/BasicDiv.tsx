import React from "react";
import GlobalStyle from "../../Globals/GlobalStyle";


const _Div = React.forwardRef<any,Props>((props:Props,ref)=>{

    return(
        <div ref={ref} className={props.id} style={GlobalStyle(props)}>
            {props.children}
        </div>
    )
})

interface Props extends GlobalProps{}


export default React.memo(_Div);