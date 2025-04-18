import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'account',
  initialState: {} as any,
  reducers: {
    storeAccount: (state, {payload}: any) => {
      return {...state, ...payload, loggedIn: true} as any;
    },
    resetAccount: () => {
      return {} as any;
    },
  },
});

export const {storeAccount, resetAccount} = slice.actions;

export default slice.reducer;
