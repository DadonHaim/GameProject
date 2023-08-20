import React, { useEffect, useRef } from "react"
import GlobalStyle from "../Globals/GlobalStyle"

export default function Flex(props: Props): JSX.Element{
   
    return(
        <>
            <div className={props.id} style={{display:"flex", ...GlobalStyle(props)}} > 
                {
                    props.children
                }
            </div>
        </>
    )
}

interface Props extends GlobalProps{
    styles? : any
    ref?    :any | undefined | null
}

