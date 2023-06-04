import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const AnimalForm = () => {
  const [animalType, setAnimalType] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogToys, setDogToys] = useState('');
  const [sharkMap, setSharkMap] = useState([{ key: '', value: '' }]);
  const [beakColor, setBeakColor] = useState('');
  const [ownersName, setOwnersName] = useState('');
  const [isVaccinated, setIsVaccinated] = useState('');

  const handleAnimalTypeChange = (event) => {
    const selectedType = event.target.value;
    setAnimalType(selectedType);

    // Reset all fields when the animal type is changed
    setName('');
    setWeight('');
    setDogBreed('');
    setDogToys('');
    setSharkMap([{ key: '', value: '' }]);
    setBeakColor('');
    setOwnersName('');
    setIsVaccinated('');
  };

  const handleSharkMapChange = (index, key, value) => {
    const updatedSharkMap = [...sharkMap];
    updatedSharkMap[index] = { key, value };
    setSharkMap(updatedSharkMap);
  };

  const handleAddEntry = () => {
    setSharkMap([...sharkMap, { key: '', value: '' }]);
  };

  const handleRemoveEntry = (index) => {
    const updatedSharkMap = [...sharkMap];
    updatedSharkMap.splice(index, 1);
    setSharkMap(updatedSharkMap);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect all the form data and do something with it
    const formData = {
      animalType,
      name,
      weight,
      dogBreed,
      dogToys,
      sharkMap,
      beakColor,
      ownersName,
      isVaccinated,
    };
    console.log(formData);
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
        <InputLabel id="animalType-label">Type</InputLabel>
        <Select
          labelId="animalType-label"
          id="animalType"
          value={animalType}
          onChange={handleAnimalTypeChange}
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

      {animalType === 'Dog' && (
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
            id="dogToys"
            label="Dog Toys"
            value={dogToys}
            onChange={(e) => setDogToys(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}

      {animalType === 'Shark' && (
        <>
          <label>Animais Devorados:</label>
          {sharkMap.map((entry, index) => (
            <div key={index}>
              <TextField
                type="text"
                placeholder="Tipo do peixe"
                value={entry.key}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleSharkMapChange(index, e.target.value, entry.value)}
              />
              <TextField
                type="text"
                placeholder="Quantidade"
                value={entry.value}
                onChange={(e) => handleSharkMapChange(index, entry.key, e.target.value)}
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
          <Button variant="contained" onClick={handleAddEntry} disabled={sharkMap.length === 5}>
            Add Entry
          </Button>
        </>
      )}

      {animalType === 'Bird' && (
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

      {animalType === 'Cat' && (
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
            id="isVaccinated"
            label="Is Vaccinated?"
            value={isVaccinated}
            onChange={(e) => setIsVaccinated(e.target.value)}
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
