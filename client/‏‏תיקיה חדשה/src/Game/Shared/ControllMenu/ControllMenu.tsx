import React from "react";
import {Button, Div ,Grid,memo} from "../../../import"
const exitIcon = require("../../../icons/Exit.png");

function ControllerMenu(props:Props){

    return(
        <Div {...props}>
            <Grid rows={1} columns={3} height="80%" gfCenter>
                <Button fillContent text="dd"/>
                <Button  />
                <Button  />
            </Grid>
        </Div>
    )

}

interface Props extends IProps{}

export default memo(ControllerMenu);