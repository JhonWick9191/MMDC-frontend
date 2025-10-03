import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 user: null , 

}

const profileSlice = createSlice({
    name:"Profile",
    initialState:initialState,
    reducers:{
        setProfile(state , value){
            state.token = value.payload
        }
    }
})

export const {setProfile} = authSlice.actions;
export default profileSlice.reducer