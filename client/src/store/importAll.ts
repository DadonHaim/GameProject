import gameSlice from "./gameSlice";
import startSlice from "./startSlice";

const allAction  = {
    Start:{
      ...startSlice.actions,
    },
    Game:{
      ...gameSlice.actions,
    }

}


export default allAction;
