import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {coTwoData:[]};

// const optionsDateTime = {  
// weekday: "long", year: "numeric", month: "short",  
// day: "numeric", hour: "2-digit", minute: "2-digit",
// second: "numeric"
// }; 



const coTwoSlice = createSlice({
    name: "coTwo",
    initialState: initialState,
    reducers: {
        generateRngNum(state) {        
                state.coTwoData.push({
                    x: Date.now(),// x
                    y:Math.floor(Math.random() * (3500 - 400 + 1) + 400), // y 
                })
        },
              
    }
});
// this way is with slice to create store
const store = configureStore({
    reducer: coTwoSlice.reducer
});
export const coTwoActions = coTwoSlice.actions;
export default store;