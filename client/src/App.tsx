import React from "react";
import {Get} from "./functions/http"
import {useDispatch,useSelector} from "react-redux";
import startSlice from "./store/startSlice"
import Game from "./Components/Game/Game";
import Guest from "./Components/Guest/Guest";

export default function App(){
 
    let [isLoading , setIsLoading] = React.useState<boolean>(false);
    let  start :any  = useSelector<any>((store) => store.start.states); 
    let Dispatch = useDispatch();

    React.useEffect(()=>{
        if(!isLoading){
            Get("/start").then((data:any)=>{
                Dispatch(startSlice.actions.setState({new:data.states}));
                setIsLoading(true);
            })
        }
    },[])


    if(!isLoading) return <> אנא המתן </>;
    if(start.isLogin) return <Game />
    else return <Guest />
    
} 






