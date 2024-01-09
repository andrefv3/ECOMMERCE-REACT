import { combineReducers } from 'redux'
import { wishlistData } from './reducers/wishlist'
import { cartData } from './reducers/cart'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage
}

const reducers = { wishlistData, cartData }

const rootReducers = combineReducers(reducers)

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)