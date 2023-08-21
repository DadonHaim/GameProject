import React from "react";
import GlobalStyle from "../../Globals/GlobalStyle";



const Text = React.forwardRef<any,Props>((props:Props , ref)=>{
    return (
        <span className="text" style={GlobalStyle(props)}> {props.val} </span>
    )
})


interface Props extends GlobalProps{
    val?:string
}

export default Text;