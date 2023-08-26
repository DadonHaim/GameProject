import { createSlice } from "@reduxjs/toolkit";
import  "../interfaces/IActions";

const initialState={
    isLogin : false,
}

const startSlice = createSlice({
    name:"start",
    initialState,
    reducers:{
        set: (state,actions:IActions)=>{
            if(!actions.payload.type || !actions.payload.newValue)  console.log("פקודה לא ידוע . בדוק את הסינטקסט");
            else if(actions.payload.type == "setIsLogin")               state.isLogin = actions.payload.newValue;
            else  console.log("no valid action");       
        }
    }
})





export default startSlice