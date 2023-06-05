import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {

  const animal = {
    type: '',
    id: '',
    name: '',
    weight: '',
    beakColor: '',
    vaccinated: '',
    ownersName: '',
    dogBread: '',
    toys: [],
    animalsEaten: new Map(),
  };


  const [animals, setAnimals] = React.useState([]);
  const animalsApi = "http://localhost:8095/animals"


  // MUI ALERT START
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (animals.length === 0) {
      setOpenSnackbar(true);
    }
  }, [animals]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // MUI ALERT END

  React.useEffect(() => {

    fetch(animalsApi)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAnimals(data);
      })
      .catch(err => {
        console.log('Error trying to GET Animals API: ', err);
      });
  }, []);

  if (animals.length === 0) {
    return (
      <Box sx={{ margin: '100px' }}>
        <Typography variant="h1" align="center" style={{ color: 'black', fontSize: '50px', backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '10px 20px', borderRadius: '10px', display: 'inline-block' }}>Internal Server Error</Typography>
        <Typography variant="h3" align="center" style={{ fontSize: '25px' }}>Animals not found</Typography>
        <SentimentVeryDissatisfiedIcon color="primary" style={{ fontSize: 100 }} />
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
          Verifique a conexão com o sistema
        </MuiAlert>
      </Snackbar>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} style={{ width: '100%', borderRadius: '0' }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Weight (g)</StyledTableCell>
            <StyledTableCell align="right">Beak Color</StyledTableCell>
            <StyledTableCell align="right">Vaccinated</StyledTableCell>
            <StyledTableCell align="right">Owner's Name</StyledTableCell>
            <StyledTableCell align="right">Dog Bread</StyledTableCell>
            <StyledTableCell align="right">Toys</StyledTableCell>
            <StyledTableCell align="right">Animals Eaten</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {animals.map((animal) => (
            <StyledTableRow key={animal.id}>
              <StyledTableCell component="th" scope="row">
                {animal.type}
              </StyledTableCell>
              <StyledTableCell align="right">{animal.id}</StyledTableCell>
              <StyledTableCell align="right">{animal.name}</StyledTableCell>
              <StyledTableCell align="right">{animal.weight}</StyledTableCell>
              <StyledTableCell align="right">{animal.hasOwnProperty('beakColor') ? animal.beakColor : '-'}</StyledTableCell>
              <StyledTableCell align="right">{animal.hasOwnProperty('vaccinated') ? (animal.vaccinated ? 'Yes' : 'No') : '-'}</StyledTableCell>
              <StyledTableCell align="right">{animal.hasOwnProperty('ownersName') ? animal.ownersName : '-'}</StyledTableCell>
              <StyledTableCell align="right">{animal.hasOwnProperty('dogBread') ? animal.dogBread : '-'}</StyledTableCell>
              <StyledTableCell align="right">{animal.hasOwnProperty('toys') ? Array.from(animal.toys).join(', ') : '-'}</StyledTableCell>
              <StyledTableCell align="right">
                {animal.hasOwnProperty('animalsEaten') ? (
                  <div>
                    {Object.entries(animal.animalsEaten).map(([key, value]) => (
                      <div key={key}>
                        <span>{key}: {value}</span>
                      </div>
                    ))}
                  </div>
                ) : '-'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}