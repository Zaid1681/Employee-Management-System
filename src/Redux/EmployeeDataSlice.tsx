import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
// interface CounterState {
//   user: string;
//   loading: boolean;
//   error: object;
// }

// Define the initial state using that type
const initialState = {
  currentEmployeeData: null,
  loading: false,
  error: false,
};

export const currentEmployeeSlice = createSlice({
  name: 'currentEmployeeData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    empStart: (state) => {
      state.loading = true;
    },
    empSuccess: (state, action) => {
      state.currentEmployeeData = action.payload;
      state.loading = false;
    },
    empFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.loading = false;
      state.error = false;
      state.currentEmployeeData = null;
    },
  },
});

export const { empStart, empSuccess, empFailure } =
  currentEmployeeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default currentEmployeeSlice.reducer;
