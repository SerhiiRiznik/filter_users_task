import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./components/Filter";
import { filteredUsers } from "./components/filterUsersSelector";
import User from "./components/User";
import { RootState } from "./state/store";
import { UserType } from "./state/Types";
import { getUsers } from "./state/usersSlice";

function App() {
  const fetchingUsers = useSelector(
    (state: RootState) => state.users.fetchingUsers
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const users: UserType[] = useSelector(filteredUsers);

  return (
    <>
      {fetchingUsers ? (
        <CircularProgress color="secondary" />
      ) : (
        <div className="App">
          <Filter />
          <Grid
            container
            spacing={5}
            style={{ padding: "50px", justifyContent: "space-around" }}
          >
            {users.map((user: UserType, index) => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  key={index}
                  style={{ maxWidth: "300px" }}
                >
                  <User
                    picture={user.picture}
                    email={user.email}
                    gender={user.gender}
                    name={user.name}
                    dob={user.dob}
                    nat={user.nat}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
}

export default App;
