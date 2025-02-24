import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_auth_url, api_key } from '../firebase/database'

// process.env.EXPO_PUBLIC_BASE_AUTH_URL
// process.env.EXPO_PUBLIC_API_KEY

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl:  base_auth_url }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({ ...auth }) => ({
                url: `accounts:signUp?key=${ api_key }`,
                method: 'POST',
                body: auth
            })
        }),
        login: builder.mutation({
            query: ({ ...auth }) => ({
                url: `accounts:signInWithPassword?key=${ api_key }`,
                method: 'POST',
                body: auth
            })
        })
    })
})

export const { useSignUpMutation, useLoginMutation } = authApi