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
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import AppBarmenu from './AppBarmenu';
import FlightSearchForm from './FlightSearchForm';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
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

const steps = ['Search for flights', 'abc'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Search for customer bookings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="customerid"
                name="firstName"
                label="Customer ID"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="to"
                name="lastName"
                label="To"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid> */}
            {/* <Grid item xs={12}>
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
                </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="start"
                name="city"
                label="Start Date"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="End Date"
                fullWidth
                variant="standard"
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="travel"
                name="zip"
                label="Travellers"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              /> */}
            {/* </Grid> */}
            {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                  />
                </Grid> */}
            {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                  />
                </Grid> */}
          </Grid>
        </React.Fragment>
      );
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory();
  const handleNext = () => {
    //setActiveStep(activeStep + 1);
    //let flight_search = {};
    let customer_id = 0;
    customer_id = document.getElementById("customerid").value;
    localStorage.setItem(
      "customerid",
      JSON.stringify(2)
    );
    history.push({
      pathname: '/mybookings'
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBarmenu />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            ADMIN
          </Typography>
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
                    {activeStep === steps.length - 1 ? 'Place order' : 'Search Flights'}
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