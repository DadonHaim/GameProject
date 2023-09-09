import React,{memo} from "react";
import GlobalStyle from "./GlobalStyle";




const styleObj = (props:IContainerProps) :React.CSSProperties=>({
    display              : (props.Grid)? "grid" : (props.Flex)?"flex":"block",
    ...GlobalStyle(props)      
})



export const Main   = memo( (props:IContainerProps) => <div className={props.className} style={styleObj(props)}> {props.children} </div>)
export const Footer = memo( (props:IContainerProps) => <div className={props.className} style={styleObj(props)}> {props.children} </div>)
export const Nav    = memo( (props:IContainerProps) => <div className={props.className} style={styleObj(props)}> {props.children} </div>)
export const Header = memo( (props:IContainerProps) => <div className={props.className} style={styleObj(props)}> {props.children} </div>)
export const Div    = memo( (props:IContainerProps) => <div className={props.className} style={styleObj(props)}> {props.children} </div>)
export const Flex   = memo( (props:IContainerProps) => <div className={props.className} style={{...styleObj(props),display:"flex"}}> {props.children} </div>)
export const Grid   = memo( (props:IContainerProps) => <div className={props.className} style={{...styleObj(props),display:"Grid"}}> {props.children} </div>)












export const Container = React.memo(function(props:IContainerProps){
    if(props.Grid || props.Flex)  
        return <div style={styleObj(props)}>{props.children}</div>
    return  <React.Fragment key={props.key}>  {props.children} </React.Fragment>
})

