import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Filter from './components/Filter';
import User from './components/User';
import { RootState } from './state/store';
import { getUsers } from './state/usersSlice';

function App() {

  const fetchingUsers = useSelector((state:RootState) => state.users.fetchingUsers)
  const dispatch = useDispatch()
  const addFilter = (gender:string,curentNationalitys:string[])=>{
    console.log(gender,curentNationalitys);
    return ()=> {
      return {gender,curentNationalitys}
    }
  }
  const filteredUsers = createSelector(
    (state:RootState) => state.users.users,
    (state:RootState)=>state.users.filters,
    (users,filters)=>{
        
        // const filter = addFilter()
        console.log(users);
        console.log(filters);
        //  switch (filter) {
        //     case 'completed':
        //        return tasks.filter(task=>task.completed === true)
        //     case 'active':
        //        return tasks.filter(task=>task.completed === false)
        //     default:
        //       return tasks
        //  }
        return []
      }
  )
  const users = useSelector(filteredUsers)

  useEffect(() => {
    dispatch(getUsers())
    
  }, [dispatch])

  
  return (
    <>
      {
        fetchingUsers ? 
        <CircularProgress color='secondary' />  : 
        <div className="App">
          <Filter addFilter={addFilter}/>
           <Grid container spacing={5}>
            {
              // @ts-ignore
              users.map((user:any,index)=>{
                return (
                  <Grid item xs={6} sm={4} key={index}>
                    <User 
                      picture={user.picture}
                      email={user.email}
                      gender={user.gender}
                      name={user.name}
                      dob={user.dob}
                      nat={user.nat}
                    />
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      }
    </>
  );
}

export default App;
