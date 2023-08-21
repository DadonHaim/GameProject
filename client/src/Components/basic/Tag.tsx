export default function Tag(props:any){

    let Comp = function(){return eval(props.x)}
    return(
        <>
        
            <Comp/>
        </>
    )
}