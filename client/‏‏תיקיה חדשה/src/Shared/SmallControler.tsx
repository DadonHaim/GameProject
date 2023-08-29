import React from "react";
import Div from "../Basic/Div";
import Flex from "../Basic/Flex";
import Button from "../Basic/Button";


const SmallController = React.forwardRef<any,Props>((props,ref)=>{
    return(
        <>
                <Flex  ref={ref} {...props} >
                    <Button id="logOut" text="d" width={20} cursor="pointer"/>
                    <Button id="sound"  text="d" width={20} cursor="pointer"/>
                    <Button id="music"  text="d" width={20} cursor="pointer"/>
                </Flex>
        </>
    )
})


interface Props extends IProps{}

export default React.memo(SmallController);