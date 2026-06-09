import { RootReducerType } from '@/types';
import {
  type UnknownAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { authReducer } from './auth/auth.slice';
import { waitlistReducer } from './waitlist/waitlist.slice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const appReducer = combineReducers({
  auth: authReducer,
  wait: waitlistReducer,
});

const rootReducer = (
  state: RootReducerType | undefined,
  action: UnknownAction,
) => {
  return action.type === 'USER_LOGOUT'
    ? appReducer(undefined, action)
    : appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
