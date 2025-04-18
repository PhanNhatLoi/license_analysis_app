import {RootState} from '@redux/store';
import {createSelector} from '@reduxjs/toolkit';

export const initAppSelector = createSelector(
  (state: RootState) => state?.initApp,
  initApp => {
    return initApp;
  },
);
