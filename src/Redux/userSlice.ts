import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
// interface CounterState {
//   user: string;
//   loading: boolean;
//   error: object;
// }

// Define the initial state using that type
const initialState={
  currentUser:null,
  loading:false,
  error:false,

};

export const userSlice = createSlice({
  name: 'currentUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
 reducers:{

  loginStart:(state)=>{
    state.loading = true;

  },
  loginSuccess:(state ,action)=>{

    state.currentUser  = action.payload
    state.loading = false;

  },
  loginFailure:(state)=>{
    state.loading = false;
    state.error=  true;

  }, 
  logout:(state)=>{
    state.loading = false;
    state.error=  false;
    state.currentUser = null;

  }

 }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
