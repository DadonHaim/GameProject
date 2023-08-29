interface IProps{
    display     ? : string,
    position    ? : string,  
    top         ? : string | number,
    bottom      ? : string | number,
    left        ? : string | number,
    right       ? : string | number,
    
    //עוטף
    border      ? : string | boolean,
    margin      ? : string | number,
    width       ? : string  | number ,
    height      ? : string  | number ,
    
    //פנים
    padding     ? : number | string,
   
    
    //מכליל
    bgColor     ? : string,
    bgImage     ? : any,
    id          ? : string,
    className   ? : string,
    opacity     ? : number ,
    fillContent ? : boolean,
    hidden      ? : boolean,
    center      ? : boolean,
    cursor      ? : string,


    //טקטס
    color       ? : string,
    text        ? : string,
    align       ? : string,
    fSize       ? : number | string,
    fWeight     ? : number | string,
    val         ? : string | any,

    
    //מיוחד
    style       ? : React.CSSProperties,
    children    ? : JSX.Element | any,
    ref         ? : any,
    key         ? : any,

    //אירועים
    api         ? : string,
    hoverSize   ? : number | string,
    hoverWidth  ? : number | string,
    hoverColor  ? : string,

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


    // onEvent:
    onLoad         ? : any ,
    onChange       ? : any ,
    onClick        ? : any ,
    //onDbClick      ? : any ,
    onMouseOver    ? : any ,
    onMouseOut     ? : any ,
    onCopy         ? : any ,
    onCut          ? : any ,
    onPaste        ? : any ,
    onDrag         ? : any ,
    onDragStart    ? : any ,
    onDragEnd      ? : any ,
    onInput        ? : any ,
    onSelect       ? : any ,
    onContextMenu  ? : any ,


    load           ?  : any;
    change         ?  : any;
    click          ?  : any;
    dbClick        ?  : any;
    hover          ?  : any;
    out            ?  : any;
    copy           ?  : any;
    cut            ?  : any;
    paste          ?  : any;
    drag           ?  : any;
    dragStart      ?  : any;
    dragEnd        ?  : any;
    input          ?  : any;
    select         ?  : any;
    rightClick     ?  : any;


}


interface EventInterface<T> {
    (event:T) : void,
}