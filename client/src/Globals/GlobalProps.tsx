interface GlobalProps{
    display     ? : string,
    position    ? : string,  
    top         ? : string | number,
    bottom      ? : string | number,
    left        ? : string | number,
    right         ? : string | number,
    
    //עוטף
    border      ? : string | boolean,
    margin      ? : string | number,
    width       ? : string  | number ,
    height      ? : string  | number ,
    
    //פנים
    padding     ? : number | string,
   
    
    //מכליל
    bgColor     ? : string,
    id          ? : string,
    className   ? : string,
    opacity     ? : number ,
    hidden      ? : boolean,
    center      ? : boolean,
    cursor      ? : string,


    //טקטס
    color       ? : string,
    text        ? : string,
    align       ? : string,
    fSize       ? : number | string,
    fWeight     ? : number | string,

    
    //מיוחד
    style       ? : React.CSSProperties,
    children    ? : JSX.Element | any,
    ref         ? : any,
    key         ? : any,

    //אירועים
    api         ? : string,


    //grid and flexs
    rows        ? : number,
    columns     ? : number,
    gfCenter    ? : boolean ,
    gfCenterY   ? : boolean ,
    gfCenterXY  ? : boolean ,
    gfPosition  ? : Array<number>[],  
    gfGap       ? : number | string,
    gfGapRow    ? : number | string,
    gfGapcolumn ? : number | string,
    gfAlignX    ? : string,
    gfAlignY    ? : string,
    gfContentX  ? : string,
    gfContentY  ? : string,




}
