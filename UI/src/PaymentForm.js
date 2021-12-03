import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
export default function PaymentForm() {
  const [age, setAge] = React.useState('Choose a seat number');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [seat, setSeat] = React.useState('Choose seat type');

  const handleChangeSeat = (event) => {
    setSeat(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking and Payment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ minWidth: 120 }}>
       
          <div style={{width: "100px"}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Agesgsdfgsdfgsdgfsfdg"
              onChange={handleChange}
            >
              <MenuItem value='Choose a seat number'>Choose a seat number</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
      
          <div style={{width: "100px"}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={seat}
              label="Agesgsdfgsdfgsdgfsfdg"
              onChange={handleChangeSeat}
            >
              <MenuItem value='Choose seat type'>Choose seat type</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
       
      </Grid>
    </React.Fragment>
  );
}