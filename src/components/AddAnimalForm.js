import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const AnimalForm = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [toys, setToys] = useState('');
  const [animalsEaten, setAnimalsEaten] = useState([{ key: '', value: '' }]);
  const [beakColor, setBeakColor] = useState('');
  const [ownersName, setOwnersName] = useState('');
  const [vaccinated, setVaccinated] = useState('');

  const [formValues, setFormValues] = useState({
    type: '',
    name: '',
    weight: '',
    dogBreed: '',
    toys: '',
    animalsEaten: [{ key: '', value: '' }],
    beakColor: '',
    ownersName: '',
    vaccinated: '',
  });

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);

    // Reset all fields when the animal type is changed
    setName('');
    setWeight('');
    setDogBreed('');
    setToys('');
    setAnimalsEaten([{ key: '', value: '' }]);
    setBeakColor('');
    setOwnersName('');
    setVaccinated('');
  };

  const handleanimalsEatenChange = (index, key, value) => {
    const updatedanimalsEaten = [...animalsEaten];
    updatedanimalsEaten[index] = { key, value };
    setAnimalsEaten(updatedanimalsEaten);
  };

  const handleAddEntry = () => {
    setAnimalsEaten([...animalsEaten, { key: '', value: '' }]);
  };

  const handleRemoveEntry = (index) => {
    const updatedanimalsEaten = [...animalsEaten];
    updatedanimalsEaten.splice(index, 1);
    setAnimalsEaten(updatedanimalsEaten);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect all the form data and do something with it
    const formData = {
      type,
      name,
      weight,
      dogBreed,
      toys,
      animalsEaten,
      beakColor,
      ownersName,
      vaccinated,
    };
   

    try {
      const response = await fetch('http://localhost:8095/animals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('API Request has been sent.')
        setFormValues();
      } else {
        console.log('An error has occurred!')
      }

    } catch(err) {
      console.log('API Error! ', err)
    }

  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
      onSubmit={handleSubmit}
    >
      <h1>Animal Registration Form</h1>

      <FormControl sx={{ minWidth: 225 }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          value={type}
          onChange={handleTypeChange}
          label="Type"
        >
          <MenuItem value="">Select Type</MenuItem>
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Bird">Bird</MenuItem>
          <MenuItem value="Lizard">Lizard</MenuItem>
          <MenuItem value="Shark">Shark</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="weight"
        label="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {type === 'Dog' && (
        <>
          <TextField
            id="dogBreed"
            label="Dog Breed"
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="toys"
            label="Dog Toys"
            value={toys}
            onChange={(e) => setToys(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}

      {type === 'Shark' && (
        <>
          <label>Animais Devorados:</label>
          {animalsEaten.map((entry, index) => (
            <div key={index}>
              <TextField
                type="text"
                placeholder="Tipo do peixe"
                value={entry.key}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleanimalsEatenChange(index, e.target.value, entry.value)}
              />
              <TextField
                type="text"
                placeholder="Quantidade"
                value={entry.value}
                onChange={(e) => handleanimalsEatenChange(index, entry.key, e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleRemoveEntry(index)}
                style={{margin: '10px'}}
                color='error'
              >
                Remove
              </Button>
            </div>
          ))}
          <Button variant="contained" onClick={handleAddEntry} disabled={animalsEaten.length === 5}>
            Add Entry
          </Button>
        </>
      )}

      {type === 'Bird' && (
        <TextField
          id="beakColor"
          label="Beak Color"
          value={beakColor}
          onChange={(e) => setBeakColor(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}

      {type === 'Cat' && (
        <>
          <TextField
            id="ownersName"
            label="Owner's Name"
            value={ownersName}
            onChange={(e) => setOwnersName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="vaccinated"
            label="Is Vaccinated?"
            value={vaccinated}
            onChange={(e) => setVaccinated(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}

      <Button variant="contained" type="submit" color="success">
        Submit
      </Button>
    </Box>
  );
};

export default AnimalForm;
