import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core"
import React, { useState } from "react"
import { setFilters } from "../state/usersSlice"

type Filter = {
   addFilter: (gender:string,curentNationalitys:string[])=>void
}

const Filter = ({addFilter}:Filter) =>{
   const [gender, setGender] = useState<string>('')
   const [curentNationalitys, setNationality] = useState<string[]>([]);
   
      const handleChangeGender = (event: any) => {
         setGender(event.target.value);
      };
      const nationalitys = [
         'AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US'
      ];
      const handleChangeNationality = (event: React.ChangeEvent<HTMLSelectElement>) => {
         const value = event.target.value;
         setNationality([...curentNationalitys, value])
      };
      const hanleSetFilter = ()=>{
         // addFilter(gender,curentNationalitys)
         // console.log('hanleSetFilter',gender,curentNationalitys);
         
         setFilters({gender,curentNationalitys})
      }

   return (
      <Grid container>  
         <Grid item xs={4} sm={4}>
            <Box sx={{ minWidth: 120 }}>
            <FormControl >
               <InputLabel id="gender-select-label">Gender</InputLabel>
               <Select 
                  labelId="gender-select-label"
                  id="gender-select"
                  value={gender}
                  label="Gender"
                  onChange={handleChangeGender}
               >
                  <MenuItem value={'all'}>all</MenuItem>
                  <MenuItem value={'male'}>male</MenuItem>
                  <MenuItem value={'female'}>female</MenuItem>
               </Select>
            </FormControl>
         </Box>
         </Grid>
         <Grid item xs={4} sm={4}>
            <FormControl>
               <InputLabel shrink htmlFor="select-nationality">
                  Nationality
               </InputLabel>
               <Select
                  multiple
                  native
                  value={curentNationalitys}
                  // @ts-ignore Typings are not considering `native`
                  onChange={handleChangeNationality}
                  label="Nationality"
                  inputProps={{
                     id: 'select-nationality',
                  }}
               >
                  {nationalitys.map((nationality) => (
                     <option key={nationality} value={nationality}>
                     {nationality}
                     </option>
                  ))}
               </Select>
         </FormControl>
      </Grid>
      <Grid item xs={4} sm={4}>
         <Button onClick={hanleSetFilter}>Apply filters</Button>
         
      </Grid>
      </Grid>
   )
}


export default Filter
