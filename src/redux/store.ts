import {persistReducer,persistStore,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig ={
  key:'auth',
  storage,
}

import { configureStore } from '@reduxjs/toolkit'
import authSlice from './api/features/auth/authSlice';
import { baseApi } from './api/baseApi';
const persistedAuthReducer = persistReducer(persistConfig,authSlice)
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        [baseApi.reducerPath]: baseApi.reducer

    },
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({serializableCheck:{
        ignoredActions:[FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER]
      }}).concat(baseApi.middleware), 
  });
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor=persistStore(store)