import { createSlice } from "@reduxjs/toolkit";

const initialState :IPageStore={
    thePage : "Guest",
    subPage : "Guest-Home"
}

const pageSlice = createSlice({
    name:"page",
    initialState,
    reducers:{
        set:(state:IPageStore , actions:IActionStore)=>{   
            if(actions.payload.type == "thePage")            state.thePage = actions.payload.newValue;
            else if(actions.payload.type == "subPage")       state.subPage = actions.payload.newValue;
        }
    }

})


export default pageSlice