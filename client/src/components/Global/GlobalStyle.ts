import ConvertPoint from "../../Functions/ConvertPoint";

let colorCounter = 0
let bgcounter = 0
let colors =[
    "black","red","green","blue","yellow"
];
let backgrouds = [
    "","","","",""
]


const GlobalStyle = (props:IGlobalProps) :React.CSSProperties=>({
    border                :props.border                   ? `1px solid ${colors[colorCounter++%5]}`                         :undefined   ,
    backgroundColor       :props.bgColor                  ? `${backgrouds[bgcounter++%5]}`                                  :undefined   ,
    backgroundImage       :props.bgImg                    ? `url(${props.bgImg})`                                           :undefined   ,
    backgroundRepeat      :`no-repeat`,
    width                 :props.width,
    height                :props.height,
    marginTop             :props.marginTop                ? props.marginTop                                                 : 0,     
    marginLeft            :props.marginLeft               ? props.marginLeft                                                : 0,  
    marginBottom          :props.marginBottom             ? props.marginBottom                                              : 0,  
    marginRight           :props.marginRight              ? props.marginRight                                               : 0,  
    margin                :props.marginAuto               ? "auto"                                                          : 0,
    justifyContent        :props.Xcenter||props.XYcenter  ? `center` :undefined   ,
    alignItems            :props.Ycenter||props.XYcenter  ? `center` :undefined   ,
    textAlign             :props.align                    ? props.align                                                     :"left"  ,
    gridTemplateColumns   :props.columns                  ?  `repeat(${props.rows},1fr)`                                    : `repeat(19,1fr)`  ,
    gridTemplateRows      :props.rows                     ?  `repeat(${props.columns},1fr)`                                 : `repeat(19,1fr)`,
    direction             :props.rtl                      ? `rtl`                                                           :"ltr",   
    gridColumn            :props.start&&props.end         ? `${ConvertPoint(props.start)[0]}/${ConvertPoint(props.end)[0]}` : undefined,
    gridRow               :props.start&&props.end         ? `${ConvertPoint(props.start)[1]}/${ConvertPoint(props.end)[1]}` : undefined,


})

export default GlobalStyle;