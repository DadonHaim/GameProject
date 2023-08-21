import { createSlice } from "@reduxjs/toolkit";

const initialState={
    states:{
        isLogin : false,
    }
}

const startSlice = createSlice({
    name:"start",
    initialState,
    reducers:{
        setState : (state,actions)=>{
            state.states = actions.payload.new;
        }
    }

})


export default startSlice