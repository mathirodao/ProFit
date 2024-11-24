import { configureStore } from '@reduxjs/toolkit'
import routinesReducer from '../features/routine/routinesSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import { userApi } from '../services/userService'
import { FitApi } from '../services/fitService'
import { authApi } from '../services/authService'

export const store = configureStore({
    reducer: {
        routines: routinesReducer,
        cartReducer,
        authReducer,
        [FitApi.reducerPath]: FitApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(FitApi.middleware)
            .concat(authApi.middleware)
            .concat(userApi.middleware)
})