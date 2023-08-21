import React from "react";
import Grid from "../basic/BasicGrid";
import { useDispatch, useSelector } from "react-redux";
import gameSlice from "../../store/gameSlice";
import SelectAvatarLocation from "./locations/selectAvatar/selectAvatar"
import { Get } from "../../functions/http";

const Game = React.forwardRef<Props,any>((props,ref)=>{
    let [isLoadding , setIsLoading] = React.useState<boolean>(false);
    let game = useSelector((store:any)=> store.game.states)
    let dispatch = useDispatch();

    React.useEffect(()=>{
        if(!isLoadding){
            Get("/game").then((data:any)=>{
                dispatch(gameSlice.actions.setState({new:data.states}))
                setIsLoading(true)
            })
        }
    },[])

    if(!isLoadding) return <>אנא המתן</>

    else return (
        <Grid ref={ref} id="Game" width={1000} height={800} margin="10px auto" border rows={19} columns={19}>
            {
                game.location=="selectAvatar"?  <SelectAvatarLocation /> : ""
            }
        </Grid>
    )
})


interface Props extends GlobalProps{}


export default React.memo(Game);