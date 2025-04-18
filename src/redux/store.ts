import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import account from './slice/account';
import initApp from './slice/initApp';
// import {api} from '@apis/index';

const reducers = combineReducers({
  // [api.reducerPath]: api.reducer,
  account,
  initApp,
});

export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: [api.reducerPath],
  whitelist: ['account', 'initApp'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};
