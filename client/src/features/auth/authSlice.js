import { createSlice } from '@reduxjs/toolkit'
export const authSlice=createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:false,
        
    },
    reducers:{
        REGISTER_SUCCESS:(state,payload)=>{
            state.isAuthenticated=true
            console.log("from authslicd")
            localStorage.setItem('token1',payload.token);
           
        },
        REGISTER_FAIL:(state)=>{
            state.isAuthenticated=false
            localStorage.removeItem('token');
           
        },
        LOAD_USER:(state)=>{
            state.isAuthenticated=true
        },
        LOGIN_SUCCESS:(state,payload)=>{
            state.isAuthenticated=true
            
            
        },
        LOGIN_FAIL:(state)=>{
            state.isAuthenticated=false
            localStorage.removeItem('token');
         
        }
    }

})
export const {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,LOAD_USER}=authSlice.actions;
export default authSlice.reducer;