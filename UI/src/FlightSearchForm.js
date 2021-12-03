import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function FlightSearchForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Search for flights
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="From"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="To"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Date"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Travellers"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Seat type"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}