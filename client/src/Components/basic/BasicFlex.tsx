import React, { useEffect, useRef } from "react"
import GlobalStyle from "../../Globals/GlobalStyle"


const Flex = React.forwardRef<any,any>((props , ref)=>{
    return(
        <div ref={ref} className={props.id} style={{display : "flex" , ...GlobalStyle(props)}}> 
            {props.children}
        </div> 
    )
})

export default React.memo(Flex);