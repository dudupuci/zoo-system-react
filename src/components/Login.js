import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    // Simulando uma fonte de dados com usuários registrados
    const users = [
      { username: 'admin', password: 'admin' },
      { username: 'user', password: 'user' },
    ];

    // Verificando se o login e a senha correspondem a algum usuário registrado
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      onLogin(); // Chamando a função onLogin passada como prop para indicar que o login foi aprovado
    } else {
      setError(true); // Exibindo erro se o login não for válido
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          width: '400px',
          p: 4,
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h5" align="center" mb={4}>
          Faça o login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            type="password"
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" type="submit" fullWidth>
            Entrar
          </Button>
          {error && (
            <Typography variant="body2" color="error" align="center" mt={2}>
              Credenciais inválidas. Verifique seu login e senha.
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Login;
