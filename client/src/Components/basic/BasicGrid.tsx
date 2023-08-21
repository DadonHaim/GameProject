import React from "react"
import GlobalStyle from "../../Globals/GlobalStyle"




const Grid = React.forwardRef<any,Props>((props , ref)=>{

    const style :React.CSSProperties = {
        display : "grid",
        ...GlobalStyle(props)
    }

    return(
        <div ref={ref} className={props.id} style={style}>  {props.children}  </div>
    )
})


 
interface Props extends GlobalProps{}

export default React.memo(Grid);