import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { UserType } from "../state/Types";

const User = (props: UserType) => {
  return (
    <Card variant="outlined">
      <CardMedia component="img" image={props.picture.large} alt="picture" />
      <CardContent>
        <Typography variant="h5">
          {props.name.title} {props.name.first} {props.name.last}
        </Typography>
        <Typography>{props.gender}</Typography>
        <Typography>{props.email}</Typography>
        <Typography>{props.dob.date.substr(0, 10)}</Typography>
        <Typography variant="h5">{props.nat}</Typography>
      </CardContent>
    </Card>
  );
};

export default User;
