import {
  AppBar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGender, setNationalitys } from "../state/usersSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const nationalitys = [
    "AU",
    "BR",
    "CA",
    "CH",
    "DE",
    "DK",
    "ES",
    "FI",
    "FR",
    "GB",
    "IE",
    "IR",
    "NO",
    "NL",
    "NZ",
    "TR",
    "US",
  ];
  // @ts-ignore
  const localNation = JSON.parse(localStorage.getItem("nation"));

  const [nation, setNation] = useState(localNation || []);
  const [selectGender, setSelectGender] = useState(
    localStorage.getItem("gender") || "all"
  );

  const handleChangeGender = (event: any) => {
    const value = event.target.value;
    setSelectGender(value);
    localStorage.setItem("gender", event.target.value);
  };

  const handleChangeNationality = (event: any) => {
    const {
      target: { value },
    } = event;
    setNation(typeof value === "string" ? value.split(",") : value);
    localStorage.setItem("nation", JSON.stringify(value));
  };

  const hanleSetFilter = () => {
    dispatch(setGender(selectGender));
    dispatch(setNationalitys(nation));
  };
  return (
    <AppBar
      position="sticky"
      color="primary"
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Grid item>
        <Box sx={{ minWidth: 120 }}>
          <FormControl>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={selectGender}
              label="Gender"
              onChange={handleChangeGender}
            >
              <MenuItem value={"all"}>all</MenuItem>
              <MenuItem value={"male"}>male</MenuItem>
              <MenuItem value={"female"}>female</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item>
        <FormControl
          size={"medium"}
          style={{ minWidth: "250px", maxWidth: "300px" }}
        >
          <InputLabel id="multiple-chip-label">Nationality</InputLabel>
          <Select
            labelId="multiple-chip-label"
            id="multiple-chip"
            multiple
            value={nation}
            onChange={handleChangeNationality}
            input={
              <OutlinedInput id="select-multiple-chip" label="Nationality" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {
                  // @ts-ignore
                  selected.map((value: any) => (
                    <Chip key={value} label={value} />
                  ))
                }
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250,
                  width: 250,
                },
              },
            }}
          >
            {nationalitys.map((nationality) => (
              <MenuItem key={nationality} value={nationality}>
                {nationality}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={hanleSetFilter}>
          Apply filters
        </Button>
      </Grid>
    </AppBar>
  );
};

export default Filter;
