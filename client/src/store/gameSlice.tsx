import { createSlice } from "@reduxjs/toolkit";

const initialState={
    states:{
        location : "selectAvatar",
    }
}

const gameSlice = createSlice({
    name:"game",
    initialState,
    reducers:{
        setState : (state,actions)=>{
            state.states = actions.payload.new;
        }
    }

})


export default gameSlice