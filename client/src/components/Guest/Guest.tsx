import React from "react";
import {Container, Footer, Header ,Flex} from "../Global/Container";
import Copyright                     from "../Global/Copyright";
import {useSelector} from "react-redux";
import GuestHome from "./Home/GuestHome";
import { Choice, Menu } from "../Global/Menu";

let HeaderBackground = require("../../Images/Backgrounds/headerGuest.jpg")
let FooterBackground = require("../../Images/Backgrounds/headerGuest.jpg")

export default function Guest(props:IGuestProps){
    let subPage = useSelector((store:any)=>store.page.subPage)

    return(
        <Container Grid className="Guest" width="110vh" height="90vh" rows={49} columns={49} marginAuto  marginTop={10} border >
            
            <Header start="1,1" end="50,5" bgImg={HeaderBackground}> 
                <Flex className="fill XYcenter">שם המשחק</Flex>
            </Header>

            <Menu start="1,5" end="50,11" border rtl>
                <Choice selected={subPage=="Guest-Home"     } toSubPage="Guest-Home"      value="בית"      />
                <Choice selected={subPage=="Guest-About"    } toSubPage="Guest-About"     value="אודות"    />
                <Choice selected={subPage=="Guest-ContactUs"} toSubPage="Guest-ContactUs" value="צור קשר"  />
                <Choice selected={subPage=="Guest-Blog"     } toSubPage="Guest-Blog"      value="בלוג"     />
                <Choice selected={subPage=="Guest-Guide"    } toSubPage="Guest-Guide"     value="מדריך"    />
            </Menu>

            {subPage=="Guest-Home"          ? <GuestHome/> : ''}
            {subPage=="Guest-About"         ? <GuestHome/> : ''}
            {subPage=="Guest-ContactUs"     ? <GuestHome/> : ''}
            {subPage=="Guest-Blog"          ? <GuestHome/> : ''}
            {subPage=="Guest-Guide"         ? <GuestHome/> : ''}

            <Footer Grid start="1,41" end="50,48" border bgImg={FooterBackground}></Footer> 
            <Copyright className="Guest-Copyright" value="" start="1,48" end="50,50" border/>
        </Container>
    )
}
 
interface IGuestProps{

}