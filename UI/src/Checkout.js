import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios"
import { useState } from 'react';
import AppBarmenu from './AppBarmenu';
import { useEffect } from 'react';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Personal details', 'Booking and payment', 'Review your order'];
const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];


const theme = createTheme();

const personalObject = {}
const bookingObject = {}
export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  let mockSeats = [
    1, 2, 3
  ]
  const [backendData, setBackendData] = useState([]);
  //payment form
  const [age, setAge] = React.useState('Choose a seat number');

  const [seat, setSeat] = React.useState('Choose seat type');
  const [firstNameFlag, setFirstNameFlag] = useState(false);
  const [firstNameHelp, setFirstNameHelp] = useState('');
  const [lastNameFlag, setLastNameFlag] = useState(false);
  const [lastNameHelp, setLastNameHelp] = useState('');
  const [cityFlag, setCityFlag] = useState(false);
  const [cityHelp, setCityHelp] = useState('');
  const [stateFlag, setStateFlag] = useState(false);
  const [stateHelp, setStateHelp] = useState('');
  const [countryFlag, setCountryFlag] = useState(false);
  const [countryHelp, setCountryHelp] = useState('');
  const [cardNameFlag, setCardNameFlag] = useState(false);
  const [cardNameHelp, setCardNameHelp] = useState('');
  const [cardNumberFlag, setCardNumberFlag] = useState(false);
  const [cardNumberHelp, setCardNumberHelp] = useState('');
  const [expDateFlag, setExpDateFlag] = useState(false);
  const [expDateHelp, setExpDateHelp] = useState('');
  const [cvvFlag, setCvvFlag] = useState(false);
  const [cvvHelp, setCvvHelp] = useState('');

  // var paymentObject = {}
  // review form data
  const [rewards, setRewards] = useState(48);
  const handleRewardClick = (event) => {
    let a = localStorage.getItem("reward-points");
    console.log(JSON.parse(a));
    let newValue = rewards - a;
    setRewards(newValue);
  };
  const handleNext = (id) => {
    if (activeStep == 0) {
      personalObject.firstName = document.getElementById("firstName").value
      personalObject.lastName = document.getElementById("lastName").value || ""
      personalObject.address1 = document.getElementById("address1").value || ""
      personalObject.address2 = document.getElementById("address2").value || ""
      personalObject.city = document.getElementById("city").value || ""
      personalObject.state = document.getElementById("state").value || ""
      personalObject.country = document.getElementById("country").value || ""
      personalObject.zip = document.getElementById("zip").value || ""


      if (/\d/.test(document.getElementById("firstName").value)) {
        setFirstNameFlag(true);
        setFirstNameHelp('Invalid first name unless you\'re Elon Musk\'s son');
      } else {
        setFirstNameFlag(false);
        setFirstNameHelp('');
      }
      if (/\d/.test(document.getElementById("lastName").value)) {
        setLastNameFlag(true);
        setLastNameHelp('Invalid last name');
      } else {
        setLastNameFlag(false);
        setLastNameHelp('');
      }
      if (/\d/.test(document.getElementById("city").value)) {
        setCityFlag(true);
        setCityHelp('Invalid city name');
      } else {
        setCityFlag(false);
        setCityHelp('');
      }
      if (/\d/.test(document.getElementById("state").value)) {
        setStateFlag(true);
        setStateHelp('Invalid state name');
      }else{
        setStateFlag(false);
        setStateHelp('');
      }
      if (/\d/.test(document.getElementById("country").value)) {
        setCountryFlag(true);
        setCountryHelp('Invalid country name');
      } else{
        setCountryFlag(false);
        setCountryHelp('');
      }

      if (!/\d/.test(document.getElementById("firstName").value) && !/\d/.test(document.getElementById("lastName").value)
        && !/\d/.test(document.getElementById("city").value) && !/\d/.test(document.getElementById("state").value) && !/\d/.test(document.getElementById("country").value)) {
        setActiveStep(activeStep + 1);
      }
    }

    if (activeStep == 1) {
      bookingObject.seatNumber = document.getElementById("seatNumber").value || ""
      bookingObject.seatType = document.getElementById("seatType").value || ""
      bookingObject.cardName = document.getElementById("cardName").value || ""
      bookingObject.cardNumber = document.getElementById("cardNumber").value || ""
      bookingObject.expDate = document.getElementById("expDate").value || ""
      bookingObject.cvv = document.getElementById("cvv").value || ""

      if (/\d/.test(document.getElementById("cardName").value)) {
        setCardNameFlag(true);
        setCardNameHelp('Invalid card name');
      } else{
        setCardNameFlag(false);
        setCardNameHelp('');
      }
      if (!/\d/.test(document.getElementById("cardNumber").value)) {
        setCardNumberFlag(true);
        setCardNumberHelp('Invalid card number');
      }else {
        setCardNumberFlag(false);
        setCardNumberHelp('');
      }
      
      if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(document.getElementById("expDate").value)) {
        setExpDateFlag(true);
        setExpDateHelp('Invalid date format');
      } else {
        setExpDateFlag(false);
        setExpDateHelp('');
      }

      if (!/\d/.test(document.getElementById("cvv").value) || document.getElementById("cvv").value.length != 3 ) {
        setCvvFlag(true);
        setCvvHelp('Invalid CVV');
      } else {
        setCvvFlag(false);
        setCvvHelp('');
      }

      if (!/\d/.test(document.getElementById("cardName").value) && /\d/.test(document.getElementById("cardNumber").value)) {
        setActiveStep(activeStep + 1);
      }
    }

    if (activeStep == steps.length - 1) {

      var requestBody = {
        "flight_number": "F7ZQ8",
        "customer_id": localStorage.getItem("customerid"),
        "amount": 3500,
        "name_on_card": bookingObject.cardName,
        "card_number": bookingObject.cardNumber,
        "expiry_date": bookingObject.expDate,
        "cvv": bookingObject.cvv

      }

      axios.post("http://127.0.0.1:8000/book", requestBody)
        .then(res => {
          const result = res.data;
          localStorage.setItem("booking_details", JSON.stringify(result))
          // history.push('/checkout');
        })
      setActiveStep(activeStep + 1);
    }

    //setActiveStep(activeStep + 1);

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeSeat = (event) => {
    setSeat(event.target.value);
  };
  useEffect(() => {
    let a = 20220;
    axios.get('http://127.0.0.1:8000/available-seats?flight_number=' + a)
      .then(res => {
        const per = res.data;
        console.log("from the seat api", per);
        setBackendData(per.results);
        // console.log()
      })
  }, []);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  error={firstNameFlag}
                  helperText={firstNameHelp}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  error={lastNameFlag}
                  helperText={lastNameHelp}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  error={cityFlag}
                  helperText={cityHelp}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                  error={stateFlag}
                  helperText={stateHelp}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                  error={countryFlag}
                  helperText={countryHelp}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid> */}
            </Grid>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Booking and Payment
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} sx={{ minWidth: 120 }}>
                {/* <TextField
                  required
                  id="seatNumber"
                  label="Seat Number"
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                /> */}
                <div style={{ width: "100px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="seatType"
                    value={age}
                    label="Agesgsdfgsdfgsdgfsfdg"
                    onChange={handleChange}
                  >
                    <MenuItem value='Choose a seat number'>Choose a seat number</MenuItem>
                    {/* {backendData.map((card) => ( */}
                    <MenuItem value={20}>1D</MenuItem>
                    <MenuItem value={30}>1B</MenuItem>
                    <MenuItem value={30}>2C</MenuItem>
                    <MenuItem value={30}>1E</MenuItem>
                    <MenuItem value={30}>2B</MenuItem>
                    <MenuItem value={30}>2A</MenuItem>
                    <MenuItem value={30}>1A</MenuItem>
                    <MenuItem value={30}>A4</MenuItem>
                    <MenuItem value={30}>2E</MenuItem>
                    <MenuItem value={30}>2D</MenuItem>
                    <MenuItem value={30}>1F</MenuItem>
                    <MenuItem value={30}>1C</MenuItem>
                    <MenuItem value={30}>2F</MenuItem>
                    {/* <MenuItem value={20}>{card}</MenuItem> */}
                    {/* ))} */}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <TextField
                  required
                  id="seatType"
                  label="Seat Type"
                  fullWidth
                  autoComplete="cc-number"
                  variant="standard"
                /> */}
                <div style={{ width: "100px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="seatNumber"
                    value={seat}
                    label="Agesgsdfgsdfgsdgfsfdg"
                    onChange={handleChangeSeat}
                  >
                    <MenuItem value='Choose seat type'>Choose seat type</MenuItem>
                    <MenuItem value={20}>Business</MenuItem>
                    <MenuItem value={30}>Economy</MenuItem>
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
                  error={cardNameFlag}
                  helperText={cardNameHelp}
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
                  error={cardNumberFlag}
                  helperText={cardNumberHelp}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="Expiry date in YYYY-MM-DD"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="standard"
                  error={expDateFlag}
                  helperText={expDateHelp}
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
                  error={cvvFlag}
                  helperText={cvvHelp}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                  label="Remember credit card details for next time"
                />
              </Grid> */}
            </Grid>
          </React.Fragment>
        )
      case 2:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {/* {products.map((product) => (
              <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.desc} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            ))} */}

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ${rewards}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping
              </Typography>
              <Typography gutterBottom>John Smith</Typography>
              <Typography gutterBottom>{addresses.join(', ')}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment details
              </Typography>
              <Grid container>
                {payments.map((payment) => (
                  <React.Fragment key={payment.name}>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid> */}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use my reward points" onClick={handleRewardClick}
              />
            </Grid>
          </React.Fragment>
        )
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}
      <AppBarmenu />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Book Flight' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
