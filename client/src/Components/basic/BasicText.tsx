import React from "react";
import GlobalStyle from "../../Globals/GlobalStyle";



const Text = React.forwardRef<any,any>((props , ref)=>{
    return (
        <span className="text" style={GlobalStyle(props)}> {props.val} </span>
    )
})



export default React.memo(Text);