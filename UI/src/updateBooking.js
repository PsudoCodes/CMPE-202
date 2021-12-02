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
import * as configData from "./configurl.json";
import AppBarmenu from './AppBarmenu';
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

export default function UpdateBooking() {
  const [activeStep, setActiveStep] = React.useState(0);

  let cust_id = localStorage.getItem("customerid")
  let book_id = localStorage.getItem("update_booking_id")
  var oldBookingObject = {}
  axios.get("http://" + configData.default.LOCAL_URL + ":8000/confirmed-flights?customer=" + cust_id)
    .then(res => {

      for (let i = 0; i < res.data.results.length; i++) {
        if (res.data.results[i].booking_reference_id == book_id) {
          oldBookingObject = res.data.results[i]
        }
      }
      let dateStr = oldBookingObject.expiry_date;
      let i = dateStr.indexOf("T")

      dateStr = dateStr.split("").slice(0, i).join("")

      oldBookingObject.expiry_date = dateStr
      if (activeStep == 1) {
        document.getElementById("cardName").value = oldBookingObject.name_on_card
        document.getElementById("cardNumber").value = oldBookingObject.card_number
        document.getElementById("expDate").value = oldBookingObject.expiry_date
        document.getElementById("cvv").value = oldBookingObject.cvv
        document.getElementById("cardName").label = " "
        document.getElementById("cardNumber").label = " "
        document.getElementById("expDate").label = " "
        document.getElementById("cvv").label = " "
        // document.getElementById("cardName").value=oldBookingObject.name_on_card
        // document.getElementById("")
      }
    })

  let reqObj = {};

  //payment form
  const [age, setAge] = React.useState('Choose a seat number');

  const [seat, setSeat] = React.useState('Choose seat type');

  // review form data
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
    }

    if (activeStep == 1) {
      // bookingObject.seatNumber = document.getElementById("seatNumber").value
      // bookingObject.seatType = document.getElementById("seatType").value
      bookingObject.seatNumber = "1D"
      bookingObject.seatType = "Economy"
      bookingObject.cardName = document.getElementById("cardName").value || ""
      bookingObject.cardNumber = document.getElementById("cardNumber").value || ""
      bookingObject.expDate = document.getElementById("expDate").value || ""
      bookingObject.cvv = document.getElementById("cvv").value || ""
    }

    if (activeStep == steps.length - 1) {

      // var requestBody  ={
      //   "flight_number": "THGD2",
      //   "customer_id": localStorage.getItem("customerid"),
      //   "amount": 3500,
      //   "name_on_card": bookingObject.cardName,
      //   "card_number": bookingObject.cardNumber,
      //   "expiry_date": bookingObject.expDate,
      //   "cvv": bookingObject.cvv
      // }
      var requestBody = {
        "booking_reference_id": localStorage.getItem("update_booking_id"),
        "seat_number": bookingObject.seatNumber,
        "seat_type": bookingObject.seatType
      }

      axios.post("http://" + configData.default.LOCAL_URL + ":8000/update", requestBody)
        .then(res => {
          const result = res.data;

          localStorage.setItem("booking_details", JSON.stringify(result))
          // history.push('/checkout');
        })
    }
    setActiveStep(activeStep + 1);
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
                  name=""
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value="Harshit"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name=""
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value="Bhoraskar"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name=""
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value="33 S 3rd St #114"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name=""
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  value=""
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name=""
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value="San Jose"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name=""
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                  value="CA"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name=""
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  value="95113"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name=""
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                  value="US"
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
                    id="seatNumber"
                    label="Agesgsdfgsdfgsdgfsfdg"
                    onChange={handleChange}
                    value=""
                  >
                    <MenuItem value='Choose a seat number'>Choose a seat number</MenuItem>
                    <MenuItem value="1D">1D</MenuItem>
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
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
                    id="seatType"
                    label="Agesgsdfgsdfgsdgfsfdg"
                    onChange={handleChangeSeat}
                  >
                    <MenuItem value='Choose seat type'>Choose seat type</MenuItem>
                    <MenuItem value="Economy">Economy</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  id="cardName"
                  label="Name on card"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  InputLabelProps={{ shrink: true }}
                  label="Expiry date"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  variant="standard"
                />
              </Grid>
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
              {products.map((product) => (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={product.name} secondary={product.desc} />
                  <Typography variant="body2">{product.price}</Typography>
                </ListItem>
              ))}

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $34.06
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
                label="Use my reward points"
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
            Update
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
                    {activeStep === steps.length - 1 ? 'Booking' : 'Next'}
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
