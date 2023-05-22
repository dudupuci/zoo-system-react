import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './css/addAnimalForm.css'
import AddAnimalSelect from './AddAnimalSelect'


export default function FormPropsTextFields() {
  return (
    <Box className='box-form'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Adicionar Animal</h1>
      <div>
        <AddAnimalSelect />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      

      
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
    
      
      </div>

    </Box>
  );
}