import  {configureStore} from "@reduxjs/toolkit";
import pageSlice from "./page";


const myStore = configureStore({
    reducer:{
        page : pageSlice.reducer,
    },
})


export const PageAction = pageSlice.actions

export default myStore

