interface IGlobalProps{
    children    ?: JSX.Element | JSX.Element[] |string|any;
    className   ? : string;
    value       ? : string;
    key         ? :any,

    width       ? : number | string;
    height      ? : number | string;

    start       ? : string;
    end         ? : string;
    
    center?:boolean;
    
    
    border?: boolean;
    bgColor     ? : string ;
    bgImg       ? : any;

    XYcenter?:boolean;
    Xcenter?:boolean;
    Ycenter?:boolean;
    align  ? : "center"|"left"|"right";

    columns?:number;
    rows?:number;

    gap?:number |string;
    rtl?:boolean;
    ltr?:boolean;


    marginAuto? :boolean;
    marginTop  ? :number|string;
    marginLeft? :number|string;
    marginRight? :number|string;
    marginBottom? :number|string;


}