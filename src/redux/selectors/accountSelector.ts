import {RootState} from '@redux/store';
import {createSelector} from '@reduxjs/toolkit';

export const accountSelector = createSelector(
  (state: RootState) => state?.account,
  account => {
    return account;
  },
);
