import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Api } from "../api/api"
type Filters = {
   gender:string
   curentNationalitys:string[]
}
const initialState = {
  users : [],
  filters : {} as Filters,
  fetchingUsers : false
}
export const getUsers = createAsyncThunk(
      'users/fetch',
      async (params,thunkApi)=>{
         try {
            const response = await Api.getUsers()
            return response.data.results
         } catch (error) {
            console.log(error);
         }
         
      }
   )
export const usersSlice = createSlice({
  'name': 'users',
 
  initialState,
  reducers: {
    getUsers: (state, action) => {
      
    },
    setFilters: (state, action) => {
       console.log(action.payload);
    },
   
  },
  extraReducers: {
      [getUsers.fulfilled.type] : (state, action)=>{
           const data = action.payload.map((data:any)=>{
              return {
                 gender:data.gender,
                  email:data.email,
                  dob:data.dob,
                  name:data.name,
                  picture:data.picture,
                  nat:data.nat
              }
           })
         state.users = data
         state.fetchingUsers = false
         
      },
      [getUsers.rejected.type] : (state, action)=>{
         state.fetchingUsers = false
         // console.log(action);
      },
      [getUsers.pending.type] : (state, action)=>{
         state.fetchingUsers = true
         // console.log(action);
      }
  }  
})

export const { setFilters } = usersSlice.actions


export default usersSlice.reducer