import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../state/store";
import { UserType } from "../state/Types";

export const filteredUsers = createSelector(
  (state: RootState) => state.users.users,
  (state: RootState) => state.users.filters,
  (users: UserType[], filters) => {
    let selecterUser = users
      .filter((user: UserType) => {
        if (filters.gender !== "all") {
          return user.gender === filters.gender;
        } else {
          return user;
        }
      })
      .filter((user) => {
        if (filters.nat.length > 0) {
          for (let i = 0; i < filters.nat.length; i++) {
            const element = filters.nat[i];
            if (user.nat === element) return user;
          }
        } else return user;
      });
    return selecterUser;
  }
);
