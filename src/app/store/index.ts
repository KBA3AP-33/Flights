import { configureStore } from '@reduxjs/toolkit';
import { flightReducer } from '@/app/store/flightSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        flight: flightReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];