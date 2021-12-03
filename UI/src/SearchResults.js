import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBarmenu from './AppBarmenu';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as configData from "./configurl.json";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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

//const cards = [1,2];
const cards = [
  {
    date: "19th December, 2021",
    seatType: "Business"
  },
  {
    date: "19th December, 2021",
    seatType: "Economy"
  }
]
//const cards = []

const theme = createTheme();

export default function SearchResults() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (val) => {
    localStorage.setItem(
      "flightid",
      val
    );
    history.push('/checkout');
  }
  const handleClose = () => setOpen(false);
  const handleUpdate = () => history.push('/checkout');
  let a = localStorage.getItem("searchquery");
  console.log("hi from api", JSON.parse(a).from);
  // console.log("from a", a.from_location)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [backendData, setBackendData] = useState([]);

  const headers = {
    'Content-Type': 'application/json',
    //"Access-Control-Allow-Origin": "*",
    //"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  };
  // axios.get('http://127.0.0.1:8000/search?from_location=BLR&to_location=DLH&start=2021-11-22 19:00:08', { headers })
  //   .then(res => {
  //     const per = res.data;
  //     console.log("from the api", per);
  //     // console.log()
  //   })
  useEffect(() => {
    axios.get('http://' + configData.default.LOCAL_URL + ':8000/search?from_location=' + JSON.parse(a).from + '&to_location=' + JSON.parse(a).to + '&start=2021-11-22 19:00:08&drop=2021-11-22 22:00:08')
      .then(res => {
        const per = res.data;
        console.log("from the api", per);
        setBackendData(per.results);
        // console.log()
      })
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AppBarmenu />
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {backendData.map((card) => (
              // {/* {cards.map((card) => ( */}
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    //image="https://source.unsplash.com/random"
                    image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F05%2F12%2Funited-airlines-FULL0520.jpg"

                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* SJC ----> NYC */}
                      {card.from_location} ----> {card.to_location}
                    </Typography>
                    <Typography>
                      {/* This is a media card. You can use this section to describe the
                      content. */}
                      <p>
                        Duration: {Math.floor(card.duration) / 60} hrs {(card.duration) % 60} mins
                        {/* Date: 16th December, 2021 */}
                      </p>
                      <p>
                        {/* Seat Number: 20G<br />
                        Seat Type: Economy */}
                        Departure date: {new Date(card.departure).getDate()} {months[new Date(card.departure).getMonth()]} {new Date(card.departure).getFullYear()}
                      </p>
                      <p>
                        {/* Departure time: {new Date(card.departure).getHours()}:{new Date(card.departure).getMinutes()}:{new Date(card.departure).getSeconds()} */}
                        Departure time: 11:00:00
                      </p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button style={{ visibility: "hidden" }} onClick={handleUpdate} size="small">Update Reservation</Button>
                    <Button onClick={() => handleOpen(card.flight_number)} size="small">Book</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography> */}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to cancel the reservation? {"\n"}
                <Button onClick={handleClose} size="small">Yes</Button>
                <Button onClick={handleClose} size="small">No</Button>
              </Typography>
              {/* <CardActions>
                <Button size="small">Yes</Button>
                <Button size="small">No</Button>
              </CardActions> */}
            </Box>
          </Modal>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}