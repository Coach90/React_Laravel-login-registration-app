import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: JSON.parse(localStorage.getItem('login_bw')),
  bearerToken:localStorage.getItem('bearerToken_bw'),
  tempToken:"",
  userDetail:JSON.parse(localStorage.getItem('userDetail_bw'))
};

export const login = createSlice({
  name: 'loginDetail',
  initialState,
  reducers: {
    setLogin: (state,action) => {
      state.login =true;
      state.tempToken=null;
      state.bearerToken=action.payload.token
      state.userDetail={...action.payload.userDetail}
      localStorage.setItem('login_bw',state.login);
      localStorage.setItem('bearerToken_bw',state.bearerToken);
      localStorage.setItem('userDetail_bw',JSON.stringify(state.userDetail))  
    },
    setTempToken:(state,action)=>{
      state.tempToken=action.payload
      
    },
    setLogout: (state) => {
      state.login =false;
      state.tempToken=null;
      state.bearerToken=null;
      localStorage.removeItem('login_bw');
      localStorage.removeItem('bearerToken_bw');
      localStorage.removeItem('userDetail_bw')
    }
  }
});

export const { setLogin,setTempToken,setLogout} = login.actions;
export default login.reducer;
