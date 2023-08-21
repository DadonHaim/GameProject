import { configureStore , createSlice} from "@reduxjs/toolkit";
import startSlice from "./startSlice";
import gameSlice from "./gameSlice";
// import user from "./userSilce";
// import settings from "./settingsSilce";



const myStore = configureStore({
    reducer:{
        start : startSlice.reducer,
        game : gameSlice.reducer,
        // settings
    },
})


export {
    myStore,
}


