import React from 'react';
import GlobalStyle from "../../Globals/GlobalStyle";


const Button = React.forwardRef<Props,any>((props,ref:any)=>{
    return(
        <button ref={ref} className={props.id} style={GlobalStyle(props)} onClick={props.onclick} onMouseOver={props.onMouseOver} >
            {props.text}
        </button>
    )
})

interface Props extends GlobalProps{};

export default React.memo(Button)