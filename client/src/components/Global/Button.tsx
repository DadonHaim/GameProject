import ConvertPoint from "../../Functions/ConvertPoint";
import {useDispatch} from "react-redux";
import { PageAction } from "../../store/store";

export default function Button(props:IButtonProps){
    let dispath = useDispatch();


    const styleButton :React.CSSProperties={
        display:"inline-flex",
        border :"1px solid",
        cursor:"pointer",
        width: props.width,
        height: props.height,
        backgroundColor: (props.bg),
        gridColumn:`${ConvertPoint(props.start)[0]}/${ConvertPoint(props.end)[0]}`,
        gridRow : `${ConvertPoint(props.start)[1]}/${ConvertPoint(props.end)[1]}`,
        justifyContent:"center",
        alignItems:"center",
    }

 
    const GoPage = ()=>{
        if(props.toPage)
            dispath(PageAction.set({type:"thePage",newValue:props.toSubPage}))
        if(props.toSubPage)
            dispath(PageAction.set({type:"subPage",newValue:props.toSubPage}))       
    }
    
    return(
        <div className={props.className} onClick={GoPage} style={styleButton}>
            {props.value}
        </div>
    )

}

interface IButtonProps{
    className?: string;
    width?: number | string;
    height?: number | string;
    bg? : string ;
    value? : string;
    start?: string;
    end?:string;
    toPage?:string;
    toSubPage?:string;
}

