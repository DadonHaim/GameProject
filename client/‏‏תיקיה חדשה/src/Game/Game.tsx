import { memo ,Grid } from "../import"
import ControllMenu from "./Shared/ControllMenu/ControllMenu"

function Game(){

    return(
        <Grid id="Game" rows={40} columns={40} >

            <ControllMenu gfPosition={[[3,3],[5,10]]}  bgColor="yellow"/>

        </Grid>
    )
}
export default memo(Game)