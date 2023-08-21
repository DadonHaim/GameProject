import { configureStore , createSlice} from "@reduxjs/toolkit";



const slice = createSlice({
  name:"count",
  initialState : {count:0},
  reducers:{
      add1:(state)=>{
          state.count++;
      },
      sub1:(state)=>{
          state.count--;
      },
      add5:(state,actions)=>{
          state.count += actions.payload.val;
      }
  }
})

const myStore = configureStore({
  reducer:{
      slice  : slice.reducer
  }
})


export {
    myStore,
    slice
}


