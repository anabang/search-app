import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://api.github.com/',
    
    }),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: 'search/users?q=',
            }),
           
        }),
    })
})

export const { 
    useGetUsersQuery, 

 } = searchApi;