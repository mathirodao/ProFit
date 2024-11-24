import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/database'

export const FitApi = createApi({
    reducerPath: "FitApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
      getOptionCards: builder.query({
        query: () => 'optionCards.json',
      }),
      getRoutines: builder.query({
        query: () => 'routines.json',
      }),
      getRoutinesByCreatedBy: builder.query({
        query: (createdBy) => {
          // The `createdBy` parameter will be used to filter routines
          return `routines.json?orderBy="createdBy"&equalTo="${createdBy}"`;
        },
        transformResponse: (response) => (response ? Object.values(response) : []),
      }),
      getExercises: builder.query({
        query: () => 'exercises.json',
      }),
      getExercisesByCategory: builder.query({
        query: (category) => {
          category = category.toLowerCase();
          return `exercises.json?orderBy="category"&equalTo="${category}"`;
        },
        transformResponse: (response) => (response ? Object.values(response) : []),
      }),
      getExerciseById: builder.query({
        query: (id) => {
          return `exercises.json?orderBy="id"&equalTo=${id}`;
        },
        transformResponse: (response) =>
          response ? Object.values(response)[0] : [],
      }),
      getRoutine: builder.query({
        query: (routineId) =>
          `routines.json?orderBy=%22id%22&equalTo=%22${routineId}%22`,
        transformResponse: (response) =>
          response ? Object.values(response)[0] : null,
      }),
      addRoutineToFirebase: builder.mutation({
        query: (newRoutine) => ({
          url: 'routines.json', // Firebase Realtime Database endpoint
          method: 'POST',
          body: newRoutine,
        }),
      }),
    }),
  });
  
  export const {
    useGetOptionCardsQuery,
    useGetRoutinesQuery,
    useGetRoutinesByCreatedByQuery,
    useGetExercisesQuery,
    useGetExercisesByCategoryQuery,
    useGetExerciseByIdQuery,
    useGetRoutineQuery,
    useAddRoutineToFirebaseMutation,
  } = FitApi;
  



// useGetExerciseQuery
        // getRoutine: builder.query({
        //     query: (routineId) => `routines.json?orderBy="id"&equalTo=${routineId}`,
        //     transformResponse: (response) => (
        //         response ? Object.values(response)[0] : null
        //     )
        // })