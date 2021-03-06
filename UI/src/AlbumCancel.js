import * as React from 'react';
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
import { useState, useEffect } from 'react';
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

const cards = [1, 2, 3, 4];

const theme = createTheme();

export default function Album() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const handleUpdate = (e) => {
    localStorage.setItem("update_booking_id", e.booking_reference_id)
    history.push('/updateBooking')
  };
  const [backendData, setBackendData] = useState([]);
  let num = 2;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

 
  let a = localStorage.getItem("customerid");
  console.log(JSON.parse(a));
  useEffect(() => {
    axios.get('http://' + configData.default.LOCAL_URL + ':8000/confirmed-flights?customer=' + a)
      .then(res => {
        const per = res.data;
        console.log("from the api", per);
        let arr = per.results;
        let arrp = arr.pop();
        setBackendData(arr);
      })
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AppBarmenu />
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {backendData.map((card) => (
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
                    image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F05%2F12%2Funited-airlines-FULL0520.jpg"

                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* SJC ----> NYC */}
                      {card.from_location} ----> {card.to_location}
                    </Typography>
                    <Typography>
                      <p>
                        Duration: {Math.floor(card.duration) / 60} hrs {(card.duration) % 60} mins
                      </p>
                      <p>
                        Departure date: {new Date(card.departure).getDate()} {months[new Date(card.departure).getMonth()]} {new Date(card.departure).getFullYear()}
                      </p>
                      <p>
                        Departure time: 11:00:00
                      </p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleUpdate(card)} size="small">Update Reservation</Button>
                    <Button onClick={handleOpen} size="small">Cancel Reservation</Button>
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
              
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to cancel the reservation? {"\n"}
                <Button onClick={handleClose} size="small">Yes</Button>
                <Button onClick={handleClose} size="small">No</Button>
              </Typography>
            
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
