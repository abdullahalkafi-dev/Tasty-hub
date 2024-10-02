import { exampleReducer } from '@/redux/counter/counterSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        example: exampleReducer,
    },
  });
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;