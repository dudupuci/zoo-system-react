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
import CustomizedTables from './components/AnimalsTable';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

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
        // vertical padding + font size from searchIcon
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


const AnimalTable = () => { }
const AddAnimalForm = () => {
    return <div>Form adicionar animal</div>
}
const EditAnimalForm = () => {
    return <div>Form editar animal</div>
}
const FindAnimal = () => {
    return <div>Inserir UUID String e encontrar animal</div>
}

const RemoveAnimal = () => {
    return <div>Inserir UUID String e remover animal</div>
}

const ClearAnimals = () => {
    return <div>Limpa todos os animais do BD</div>
}


export default function SearchAppBar() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [selectedComponent, setSelectedComponent] = React.useState(null);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleMenuItemClick = (component) => {
        setSelectedComponent(component);
        setIsDrawerOpen(false);
    }


    const renderComponent = () => {
        if (selectedComponent === 'animalTable') {
            return <CustomizedTables />;
        } else if (selectedComponent === 'addAnimalForm') {
            return <AddAnimalForm />
        } else if (selectedComponent === 'editAnimalForm') {
            return <EditAnimalForm />
        } else if (selectedComponent === 'findAnimal') {
            return <FindAnimal />
        } else if (selectedComponent === 'clearAnimals') {
            return <ClearAnimals />
        } else if (selectedComponent === 'removeAnimal') {
            return <RemoveAnimal />
        }
        return null;
    }

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
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'left' } }}
                    >
                        Animals ZOO System v1.0.0
                    </Typography>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
            >
                <List>
                    <ListItem button onClick={() => handleMenuItemClick('animalTable')}>
                        <TableRowsIcon />  <StyledIcon> <ListItemText primary="Mostrar tabela de Animais" /> </StyledIcon>
                    </ListItem>

                    <ListItem button onClick={() => handleMenuItemClick('addAnimalForm')}>
                        <AddIcon /> <StyledIcon> <ListItemText primary="Adicionar animal" /> </StyledIcon>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuItemClick('editAnimalForm')}>
                        <EditSharpIcon /> <StyledIcon><ListItemText primary="Editar animal" /></StyledIcon>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuItemClick('findAnimal')}>
                        <SearchSharpIcon />  <StyledIcon> <ListItemText primary="Encontrar animal" /></StyledIcon>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuItemClick('removeAnimal')}>
                        <DeleteOutlineSharpIcon />  <StyledIcon><ListItemText primary="Remover animal" /></StyledIcon>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuItemClick('clearAnimals')}>
                        <ClearSharpIcon /> <StyledIcon><ListItemText primary="Limpar todos os animais" /></StyledIcon>
                    </ListItem>
                </List>
            </Drawer>
            {renderComponent()}
        </Box>
    );
}


