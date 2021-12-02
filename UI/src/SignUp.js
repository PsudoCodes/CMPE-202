import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBarmenu from './AppBarmenu';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as configData from "./configurl.json";
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const history = useHistory();
    const headers = {
        'Content-Type': 'application/json',
        //"Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        const reqbody = {
            first_name: "ani",
            last_name: "S",
            contact: "+12198989",
            email: "test1@gmail.com",
            address_line1: "123 ABC",
            address_line2: "XYZ",
            city: "San Jose",
            state: "California",
            zip_code: "121212",
            password: "Admin@1234"
        };
        reqbody.first_name = document.getElementById("firstName").value;
        reqbody.last_name = document.getElementById("lastName").value;
        reqbody.contact = document.getElementById("contact").value;
        reqbody.email = document.getElementById("email").value;
        reqbody.password = document.getElementById("password").value;
        console.log(reqbody);
        axios.post('http://' + configData.default.LOCAL_URL + ':8000/enroll', reqbody)
            .then(res => {
                const per = res.data;
                console.log("from the api", per);
                //setBackendData(per.results);
                // console.log()
                localStorage.setItem(
                    "customerid",
                    JSON.stringify(per.customer_id)
                );
                history.push('/search');
            })
        // localStorage.setItem(
        //     "customerid",
        //     JSON.stringify(flight_search)
        // );
        // history.push('/search');

    };

    const handleSingIn = (event) => {
        //console.log("sds");

        history.push('/signin');

    }
    return (
        <ThemeProvider theme={theme}>
            <AppBarmenu />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="contact"
                                    label="Contact Number"
                                    name="contact"
                                    autoComplete="contact"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive information, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={handleSingIn}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}