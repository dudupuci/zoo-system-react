import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import TableRowsIcon from '@mui/icons-material/TableRows';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import CustomizedTables from './components/AnimalsTableComponent';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledIcon = styled(ListItemText)(({ theme }) => ({
  marginLeft: '10px',
}));

const AnimalTable = () => <div>Tabela de Animais</div>;
const AddAnimalForm = () => <div>Formulário de Adicionar Animal</div>;
const EditAnimalForm = () => <div>Formulário de Editar Animal</div>;
const FindAnimal = () => <div>Encontrar Animal</div>;
const RemoveAnimal = () => <div>Remover Animal</div>;
const ClearAnimals = () => <div>Limpar Todos os Animais</div>;

export default function SearchAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemClick = (component) => {
    setSelectedComponent(component);
    setIsSubMenuOpen(false);
  };

  const handleSubMenuItemClick = (component) => {
    setSelectedComponent(component);
    setIsDrawerOpen(false);
  };

  const handleAddAnimalClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const renderComponent = () => {
    if (selectedComponent === 'animalTable') {
      return <CustomizedTables />;
      setIsDrawerOpen(false);
    } else if (selectedComponent === 'add') {
      return <AddAnimalForm />;
    } else if (selectedComponent === 'edit') {
      return <EditAnimalForm />;
    } else if (selectedComponent === 'find') {
      return <FindAnimal />;
    } else if (selectedComponent === 'remove') {
      return <RemoveAnimal />;
    } else if (selectedComponent === 'clear') {
      return <ClearAnimals />;
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block', textAlign: 'left' },
            }}
          >
            Animals ZOO System v1.0.0
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={() => handleMenuItemClick('animalTable')}>
            <TableRowsIcon />
            <StyledIcon>
              <ListItemText primary="Mostrar tabela de Animais" />
            </StyledIcon>
          </ListItem>
          <ListItem button onClick={handleAddAnimalClick}>
            <AddIcon />
            <StyledIcon>
              <ListItemText primary="Adicionar animal" />
            </StyledIcon>
            {isSubMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          {isSubMenuOpen && (
            <List sx={{ pl: 3 }}>
              <ListItem button onClick={() => handleSubMenuItemClick('add-dog')}>
                <ListItemText primary="Cachorro" />
              </ListItem>
              <ListItem button onClick={() => handleSubMenuItemClick('add-cat')}>
                <ListItemText primary="Gato" />
              </ListItem>
              <ListItem button onClick={() => handleSubMenuItemClick('add-bird')}>
                <ListItemText primary="Pássaro" />
              </ListItem>
            </List>
          )}
          <ListItem button onClick={() => handleMenuItemClick('edit')}>
            <EditSharpIcon />
            <StyledIcon>
              <ListItemText primary="Editar animal" />
            </StyledIcon>
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('find')}>
            <SearchSharpIcon />
            <StyledIcon>
              <ListItemText primary="Encontrar animal" />
            </StyledIcon>
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('remove')}>
            <DeleteOutlineSharpIcon />
            <StyledIcon>
              <ListItemText primary="Remover animal" />
            </StyledIcon>
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('clear')}>
            <ClearSharpIcon />
            <StyledIcon>
              <ListItemText primary="Limpar todos os animais" />
            </StyledIcon>
          </ListItem>
        </List>
      </Drawer>
      {renderComponent()}
    </Box>
  );
}
