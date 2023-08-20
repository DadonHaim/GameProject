export default  function GlobalStyle(props: any):any{

    let obj :any = {};

    if(props.display)
        obj.display = props.display;
    if(props.position)
        obj.position = props.position;
    if(props.top)
        obj.top = props.top;
    if(props.bottom)
        obj.bottom = props.bottom;
    if(props.left)
        obj.left = props.left;
    if(props.right)
        obj.right = props.right;

     //עוטף   
    if(props.border){
        if(props.border.toString() == "true")
            obj.border = "1px solid black";
        else
            obj.border = props.border;
    }
    if(props.margin)
        obj.margin = props.margin;
    if(props.width)
        obj.width = props.width;
    if(props.height)
        obj.height = props.height;

    //פנים
    if(props.padding)
        obj.padding = props.padding;

    //מכליל
    if(props.bgColor)
        obj.backgroundColor = props.bgColor;
    if(props.opacity)
        obj.opacity = props.opacity+"%";
    // if(props.hidden)
    //     obj.display = "none";
    if(props.center){
        obj.position = "absolute";
        obj.top = "50%";
        obj.right = "50%";
        obj.transform = "translate(-50%,-50%)"
    }
    if(props.cursor)
        obj.cursor = props.cursor; 

    //טקטס  
    if(props.color)
        obj.color = props.color;
    if(props.align)
        obj.textAlign = props.align;
    if(props.fSize)
        obj.fontSize = props.fSize;
    if(props.fWeight)
        obj.fontWeight = props.fWeight;


    //grid and flex
    if(props.rows)
        obj.gridTemplateRows    = `repeat(${props.rows}, 1fr)`;
    if(props.columns)
        obj.gridTemplateColumns = `repeat(${props.columns}, 1fr)`;
    if(props.gfCenter){
        obj.justifyContent = "center";
        obj.placeContent = "center";
    }
    if(props.gfCenterY){
        obj.alignContent = "center";
        obj.placeItems = "center";
    }
    if(props.gfCenterXY){
        obj.placeItems = "center";
        obj.placeContent = "center";
        obj.alignContent = "center";
        obj.justifyContent = "center";
    }
    if(props.gfPosition)
        obj.gridArea    = props.gfPosition[0][0] + '/' + props.gfPosition[0][1] + '/' + props.gfPosition[1][0] + '/' + props.gfPosition[1][1];
    if(props.gfGap)
        obj.gap = props.gfGap;
    if(props.gfGapRow)
        obj.gridRowGap = props.gfGapRow;
    if(props.gfGapcolumn)
        obj.gridcolumnGap = props.gfGapcolumn;
    
    if(props.gfAlignX){
        obj.alignContent = props.gfGapcolumn;
    }
    if(props.gfAlignY){
        obj.alignItems = props.gfGapcolumn;
    }
    if(props.gfContentX){
        obj.justifyContext = props.gfGapcolumn;
    }
    if(props.gfContentY){
        obj.justifyItems = props.gfGapcolumn;
    }
    
    
    return obj;
}