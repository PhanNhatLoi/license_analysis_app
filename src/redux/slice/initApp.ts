import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'initApp',
  initialState: {
    firstOpen: false,
    results: [],
  } as any,
  reducers: {
    firstOpenApp: state => {
      return {...state, firstOpen: true} as any;
    },
    setLanguage: (state, {payload}) => {
      return {...state, ...payload} as any;
    },
    saveVideo: (state, {payload}) => {
      return {...state, ...payload} as any;
    },
    pushResult: (state, {payload}) => {
      const results = state.results || [];

      const trimmedResults =
        results.length >= 10 ? results.slice(0, -1) : results;

      return {
        ...state,
        results: [payload, ...trimmedResults],
      };
    },
    editResult: (state, {payload}: {payload: {id: string & any}}) => {
      return {
        ...state,
        results: state.results.map((item: any) => {
          return item.id === payload.id ? payload : item;
        }),
      };
    },
    removeResult: (state, {payload}: {payload: {id: string}}) => {
      return {
        ...state,
        results: (state.results as any[]).filter(f => f.id !== payload.id),
      };
    },
    clearResults: state => {
      return {
        ...state,
        results: [],
      };
    },
  },
});

export const {
  firstOpenApp,
  setLanguage,
  saveVideo,
  pushResult,
  removeResult,
  clearResults,
  editResult,
} = slice.actions;

export default slice.reducer;
