import React from "react"
import { Div, Main } from "../../Global/Container";
import Button from "../../Global/Button";

const GuestHome = React.memo((props:IGuestHomeProps)=>{

    return(
        <Main Grid start="1,11" end="50,41" border>
            <Button className="Guest-main-Button-login"     start="14,5" end="18,9"   value="התחברות" />
            <Button className="Guest-main-Button-register"  start="12,10" end="16,14" value="הרשמה"   />
            <Div Div border start="3,3" end="7,11"> </Div>
        </Main>
    )
}) 


interface IGuestHomeProps{}

export default GuestHome;