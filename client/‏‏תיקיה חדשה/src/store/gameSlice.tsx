import { createSlice } from "@reduxjs/toolkit";

const initialState={
    MusicOn : true,
    SoundOn : true,
}

const gameSlice = createSlice({
    name:"game",
    initialState,
    reducers:{
        set:(state , actions)=>{
            if(!actions.payload.type || !actions.payload.newValue)  console.log("פקודה לא ידוע . בדוק את הסינטקסט");

            
            else if(actions.payload.type == "setMusicOn")      
               state.MusicOn = actions.payload.newValue;
            else if(actions.payload.type == "setSoundOn")      
               state.SoundOn = actions.payload.newValue;

            else  console.log("no valid action");       
        }
    }

})


export default gameSlice