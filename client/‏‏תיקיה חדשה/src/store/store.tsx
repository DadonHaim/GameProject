import  {configureStore} from "@reduxjs/toolkit";
import startSlice from "./startSlice";
import gameSlice from "./gameSlice";


const myStore = configureStore({
    reducer:{
        start : startSlice.reducer,
        game  : gameSlice.reducer,
    },
})




export default myStore