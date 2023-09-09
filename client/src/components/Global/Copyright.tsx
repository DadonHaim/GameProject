import ConvertPoint from "../../Functions/ConvertPoint";

export default function Copyright(props:ICopyrightProps){
    let style :React.CSSProperties={
        textAlign:"center",
        gridColumn:`${ConvertPoint(props.start)[0]}/${ConvertPoint(props.end)[0]}`,
        gridRow : `${ConvertPoint(props.start)[1]}/${ConvertPoint(props.end)[1]}`,
        border :"1px solid",

    }
    return(
        <div style={style} className={props.className}>
            {props.value}
        </div>
    )
}

interface ICopyrightProps{
    value?:string;
    className?:string;
    start? : string;
    end?:string;
    border? :boolean;
}