import React from 'react'
import { createSlice } from '@reduxjs/toolkit';
const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            // console.log("feed",action.payload);
            return action.payload;
        },
        removeOneCard: (state,action) => {
        const newFeed= state.filter((user)=>user._id!== action.payload);
           return newFeed;
    }
  
    }
});
  

export const { addFeed, removeOneCard } = feedSlice.actions;
export default feedSlice.reducer;