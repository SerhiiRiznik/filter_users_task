
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Api } from "../api/api"
import { UserType } from "./Types"
type Filters = {
   gender:string
   nat:string[]
}

const initialState = {
  users : [] as UserType[],
  filters : {
   gender: 'all',
   nat:[]
  }  as Filters,
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
    setGender: (state, action) => {
       if (action.payload !== null) {
          state.filters.gender = action.payload
       }
      
      
    },
    setNationalitys: (state, action) => {
            
       if (action.payload !== null) {
         state.filters.nat = action.payload
         
         
      }
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

export const {setGender,setNationalitys } = usersSlice.actions


export default usersSlice.reducer